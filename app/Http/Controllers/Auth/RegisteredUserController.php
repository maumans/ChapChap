<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => [
                'required',
                'string',
                'unique:users',
                function ($attribute, $value, $fail) {
                    $cleanPhone = preg_replace('/[^0-9+]/', '', $value);
                    if (!preg_match('/^\+?224[0-9]{9}$/', $cleanPhone)) {
                        $fail('Le numéro de téléphone doit être un numéro guinéen valide (+224 suivi de 9 chiffres).');
                    }
                },
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'prenom.required' => 'Le prénom est requis.',
            'prenom.max' => 'Le prénom ne doit pas dépasser 255 caractères.',
            'nom.required' => 'Le nom est requis.',
            'nom.max' => 'Le nom ne doit pas dépasser 255 caractères.',
            'email.required' => 'L\'adresse email est requise.',
            'email.email' => 'L\'adresse email n\'est pas valide.',
            'email.unique' => 'Cette adresse email est déjà utilisée.',
            'phone.required' => 'Le numéro de téléphone est requis.',
            'phone.unique' => 'Ce numéro de téléphone est déjà utilisé.',
            'password.required' => 'Le mot de passe est requis.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
        ]);

        // Nettoyer et formater le numéro de téléphone
        $cleanPhone = preg_replace('/[^0-9+]/', '', $request->phone);
        if (!str_starts_with($cleanPhone, '+224')) {
            if (str_starts_with($cleanPhone, '224')) {
                $cleanPhone = '+' . $cleanPhone;
            } else {
                $cleanPhone = '+224' . $cleanPhone;
            }
        }

        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'phone' => $cleanPhone,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
