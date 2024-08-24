<?php

namespace App\Http\Middleware;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            "categories" => Categorie::where('status', true)->with(['categories'=>function($query){
                return $query->where('status',true)->with(['categories'=>function($query){
                    return $query->where('status',true);
                }]);
            },'categorie'])->where('niveau_id', 1)->get(['id','nom']),

        ];
    }
}
