<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class DataDeletionController extends Controller
{
    /**
     * Affiche la page de confirmation de suppression
     */
    public function show(Request $request)
    {
        // Si c'est une requête de confirmation Facebook
        if ($request->has('signed_request')) {
            return $this->handleFacebookRequest($request);
        }

        // Sinon, affiche la page d'instructions
        return response()->json([
            'message' => 'Pour supprimer vos données, veuillez vous rendre sur Facebook et supprimer l\'application depuis vos paramètres.',
            'url' => 'https://www.facebook.com/settings/?tab=applications'
        ]);
    }

    /**
     * Gère la requête de suppression de Facebook
     */
    private function handleFacebookRequest(Request $request)
    {
        try {
            $signed_request = $request->input('signed_request');
            list($encoded_sig, $payload) = explode('.', $signed_request, 2);

            $secret = Config::get('services.facebook.client_secret'); // Votre Facebook App Secret
            
            // Décode la signature
            $sig = $this->base64UrlDecode($encoded_sig);
            $data = json_decode($this->base64UrlDecode($payload), true);

            // Vérifie la signature
            $expected_sig = hash_hmac('sha256', $payload, $secret, true);
            if ($sig !== $expected_sig) {
                return response()->json(['error' => 'Bad Signed JSON signature!'], 400);
            }

            // Confirme la suppression
            if (!empty($data['user_id'])) {
                // Supprime l'utilisateur
                User::where('provider_id', $data['user_id'])
                    ->where('provider', 'facebook')
                    ->delete();

                // Log la suppression
                Log::info('Facebook user data deleted', ['user_id' => $data['user_id']]);

                // Renvoie la confirmation à Facebook
                return response()->json([
                    'url' => route('data-deletion.status', ['id' => $data['user_id']]),
                    'confirmation_code' => $data['user_id']
                ]);
            }

            return response()->json(['error' => 'No user_id provided'], 400);

        } catch (\Exception $e) {
            Log::error('Facebook data deletion error', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid request'], 400);
        }
    }

    /**
     * Endpoint de statut pour Facebook
     */
    public function status($id)
    {
        return response()->json([
            'status' => 'success',
            'confirmation_code' => $id
        ]);
    }

    /**
     * Décode une chaîne base64 URL-safe
     */
    private function base64UrlDecode($input)
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }
}
