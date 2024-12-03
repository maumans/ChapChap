<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Categorie;
use App\Models\champ;
use App\Models\Devise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $annonces = Annonce::where('status', true)
            ->with(['categorie', 'devise'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Annonce/Index', [
            'annonces' => $annonces
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $categoriesGroup = Categorie::where('status', true)->whereDoesntHave('categories')->with('categorie')->get(['id','nom',"categorie_id"]);
        $devises = Devise::where('status', true)->get();

        return Inertia::render('Annonce/Create',
        [
            "categoriesGroup" => $categoriesGroup,
            "devises" => $devises,
        ]);
    }

    public function categorieChamps(Request $request)
    {
        $categorie = Categorie::findOrFail($request->categorieId);
        $champs = $categorie->champs()
            ->orderBy('ordre', 'asc')
            ->get()
            ->map(function ($champ) {
                return [
                    'id' => $champ->id,
                    'nom' => $champ->nom,
                    'label' => $champ->label,
                    'type' => $champ->type,
                    'description' => $champ->description,
                    'options' => $champ->options,
                    'ordre' => $champ->ordre
                ];
            });

        return response()->json($champs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request->all());
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'adresse' => 'required|string',
            'nombreArticle' => 'required|integer|min:1',
            'telephone' => 'required|string',
            'whatsApp' => 'nullable|string',
            'facebook' => 'nullable|string',
            'categorie_id' => 'required|exists:categories,id',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'champs' => 'array'
        ]);

        DB::beginTransaction();

        try {
            // Créer l'annonce
            $annonce = Annonce::create([
                'titre' => $validated['titre'],
                'description' => $validated['description'],
                'adresse' => $validated['adresse'],
                'nombreArticle' => $validated['nombreArticle'],
                'telephone' => $validated['telephone'],
                'whatsApp' => $validated['whatsApp'],
                'facebook' => $validated['facebook'],
                'categorie_id' => $validated['categorie_id'],
                'user_id' => auth()->id(),
                'status' => true
            ]);

            // Gérer les images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('annonces', 'public');
                    $annonce->images()->create([
                        'url' => $path
                    ]);
                }
            }

            // Gérer les champs personnalisés
            if (isset($validated['champs'])) {
                foreach ($validated['champs'] as $champNom => $valeur) {
                    $champ = Champ::where('nom', $champNom)->first();
                    if ($champ) {
                        $annonce->champs()->attach($champ->id, ['valeur' => $valeur]);
                    }
                }
            }

            DB::commit();

            return redirect()->route('annonce.show', $annonce)->with('success', 'Annonce créée avec succès');
        }
        catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $annonce = Annonce::where('status', true)->paginate(10);

        return Inertia::render('Annonce/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $annonce = Annonce::findOrFail($id);
        
        // Vérifier si l'utilisateur est autorisé à modifier cette annonce
        if ($annonce->user_id !== auth()->id()) {
            abort(403);
        }

        $categoriesGroup = Categorie::where('status', true)
            ->whereDoesntHave('categories')
            ->with('categorie')
            ->get(['id','nom',"categorie_id"]);
        $devises = Devise::where('status', true)->get();

        return Inertia::render('Annonce/Edit', [
            'annonce' => $annonce,
            'categoriesGroup' => $categoriesGroup,
            'devises' => $devises,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $annonce = Annonce::findOrFail($id);
        
        // Vérifier si l'utilisateur est autorisé à modifier cette annonce
        if ($annonce->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'prix' => 'required|numeric|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'devise_id' => 'required|exists:devises,id',
            'champs' => 'array'
        ]);

        $annonce->update([
            'titre' => $validated['titre'],
            'description' => $validated['description'],
            'prix' => $validated['prix'],
            'categorie_id' => $validated['categorie_id'],
            'devise_id' => $validated['devise_id']
        ]);

        if (isset($validated['champs'])) {
            $annonce->champs()->sync($validated['champs']);
        }

        return redirect()->route('annonce.show', $annonce)
            ->with('success', 'Annonce mise à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $annonce = Annonce::findOrFail($id);
        
        // Vérifier si l'utilisateur est autorisé à supprimer cette annonce
        if ($annonce->user_id !== auth()->id()) {
            abort(403);
        }

        $annonce->delete();

        return redirect()->route('annonce.index')
            ->with('success', 'Annonce supprimée avec succès');
    }
}
