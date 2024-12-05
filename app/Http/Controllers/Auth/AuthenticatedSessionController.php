<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        try {
            $credentials = $this->getCredentials($request);
            
            if (!Auth::attempt($credentials, $request->boolean('remember'))) {
                throw ValidationException::withMessages([
                    'identifier' => __('auth.failed'),
                ]);
            }

            $request->session()->regenerate();

            return redirect()->intended(RouteServiceProvider::HOME);
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'identifier' => 'Une erreur est survenue lors de la connexion.',
            ]);
        }
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Get the credentials array based on the login type.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function getCredentials(Request $request)
    {
        $loginType = $request->input('login_type', 'email');
        $identifier = $request->input('identifier');

        // Nettoyer le numéro de téléphone
        if ($loginType === 'phone') {
            $identifier = preg_replace('/[^0-9+]/', '', $identifier);
        }

        return [
            $loginType => $identifier,
            'password' => $request->input('password'),
        ];
    }
}
