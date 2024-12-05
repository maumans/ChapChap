<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'identifier' => ['required', 'string'],
            'password' => ['required', 'string'],
            'login_type' => ['required', 'string', 'in:email,phone'],
        ];

        // Validation spécifique selon le type de connexion
        if ($this->input('login_type') === 'phone') {
            $rules['identifier'][] = function ($attribute, $value, $fail) {
                $cleanPhone = preg_replace('/[^0-9+]/', '', $value);
                if (!preg_match('/^\+?224[0-9]{9}$/', $cleanPhone)) {
                    $fail('Le numéro de téléphone doit être un numéro guinéen valide (+224 suivi de 9 chiffres).');
                }
            };
        } elseif ($this->input('login_type') === 'email') {
            $rules['identifier'][] = 'email';
        }

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'identifier.required' => 'L\'email ou le numéro de téléphone est requis.',
            'identifier.email' => 'L\'adresse email n\'est pas valide.',
            'password.required' => 'Le mot de passe est requis.',
            'login_type.required' => 'Le type de connexion est requis.',
            'login_type.in' => 'Le type de connexion doit être email ou téléphone.',
        ];
    }

    /**
     * Get the credentials array based on the login type.
     *
     * @return array
     */
    protected function getCredentials(): array
    {
        $loginType = $this->input('login_type', 'email');
        $identifier = $this->input('identifier');

        // Nettoyer le numéro de téléphone pour le format guinéen
        if ($loginType === 'phone') {
            $cleanPhone = preg_replace('/[^0-9+]/', '', $identifier);
            
            // Ajouter le préfixe +224 si nécessaire
            if (!Str::startsWith($cleanPhone, '+224')) {
                if (Str::startsWith($cleanPhone, '224')) {
                    $cleanPhone = '+' . $cleanPhone;
                } else {
                    $cleanPhone = '+224' . $cleanPhone;
                }
            }
            
            $identifier = $cleanPhone;
        }

        return [
            $loginType => $identifier,
            'password' => $this->input('password'),
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $credentials = $this->getCredentials();

        if (!Auth::attempt($credentials, $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'identifier' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'identifier' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('identifier')) . '|' . $this->ip());
    }
}
