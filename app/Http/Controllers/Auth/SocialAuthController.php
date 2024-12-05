<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Exception;
use Inertia\Inertia;

class SocialAuthController extends Controller
{
    /**
     * Les providers autorisés
     */
    protected $providers = [
        'google',
        'facebook'
    ];

    /**
     * Redirige vers le provider d'authentification
     */
    public function redirectToProvider($provider)
    {
        // Vérifie si le provider est autorisé
        if (!in_array($provider, $this->providers)) {
            return Inertia::render('Auth/Login', [
                'error' => 'Provider d\'authentification non supporté.'
            ]);
        }

        try {
            if ($provider === 'facebook') {
                return Socialite::driver($provider)
                    ->scopes(['email', 'public_profile'])
                    ->with([
                        'auth_type' => 'rerequest',
                        'display' => 'popup',
                        'prompt' => 'consent'
                    ])
                    ->redirect();
            }
            return Socialite::driver($provider)->redirect();
        } catch (Exception $e) {
            return Inertia::render('Auth/Login', [
                'error' => 'Erreur lors de la redirection vers ' . ucfirst($provider)
            ]);
        }
    }

    /**
     * Gère le callback du provider d'authentification
     */
    public function handleProviderCallback($provider)
    {
        // Vérifie si le provider est autorisé
        if (!in_array($provider, $this->providers)) {
            return Inertia::render('Auth/Login', [
                'error' => 'Provider d\'authentification non supporté.'
            ]);
        }

        try {
            $socialUser = Socialite::driver($provider)->user();
            
            // Pour Facebook, on vérifie les données brutes
            if ($provider === 'facebook') {
                $rawUser = $socialUser->getRaw();
                if (isset($rawUser['email'])) {
                    $email = $rawUser['email'];
                } else {
                    return Inertia::render('Auth/Login', [
                        'error' => 'L\'email est requis pour l\'authentification. Veuillez autoriser l\'accès à votre email et réessayer.'
                    ]);
                }
            } else {
                $email = $socialUser->getEmail();
            }
            
            // Vérifier si l'email est disponible
            if (!$email) {
                return Inertia::render('Auth/Login', [
                    'error' => 'L\'email est requis pour l\'authentification. Veuillez autoriser l\'accès à votre email.'
                ]);
            }

            // Chercher l'utilisateur dans la base de données
            $user = User::where('email', $email)->first();

            // Si l'utilisateur n'existe pas, le créer
            if (!$user) {
                $name = explode(' ', $socialUser->getName());
                $user = User::create([
                    'prenom' => $name[0],
                    'nom' => $name[1] ?? '',
                    'email' => $email,
                    'password' => bcrypt(Str::random(16)),
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'email_verified_at' => now(),
                ]);
            }

            // Connecter l'utilisateur et régénérer la session
            Auth::login($user);
            request()->session()->regenerate();

            return redirect()->intended(RouteServiceProvider::HOME);

        } catch (Exception $e) {
            return Inertia::render('Auth/Login', [
                'error' => 'Une erreur est survenue lors de la connexion avec ' . ucfirst($provider) . ': ' . $e->getMessage()
            ]);
        }
    }
}
