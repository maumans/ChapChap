<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Champ;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChampController extends Controller
{
    public function index()
    {
        $champs = Champ::with('categories')
            ->orderBy('ordre')
            ->get();

        $categories = Categorie::whereNull('categorie_id')
            ->with('categories')
            ->get();

        return Inertia::render('Admin/Champ/Index', [
            'champs' => $champs,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'type' => 'required|string',
            'placeholder' => 'nullable|string',
            'description' => 'nullable|string',
            'options' => 'nullable|array',
            'ordre' => 'required|integer',
            'categories' => 'required|array'
        ]);

        $champ = Champ::create($validated);
        $champ->categories()->sync($request->categories);

        return redirect()->back()->with('success', 'Champ créé avec succès');
    }

    public function update(Request $request, Champ $champ)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'type' => 'required|string',
            'placeholder' => 'nullable|string',
            'description' => 'nullable|string',
            'options' => 'nullable|array',
            'ordre' => 'required|integer',
            'categories' => 'required|array'
        ]);

        $champ->update($validated);
        $champ->categories()->sync($request->categories);

        return redirect()->back()->with('success', 'Champ mis à jour avec succès');
    }

    public function destroy(Champ $champ)
    {
        $champ->categories()->detach();
        $champ->delete();

        return redirect()->back()->with('success', 'Champ supprimé avec succès');
    }

    public function updateOrder(Request $request)
    {
        $request->validate([
            'champs' => 'required|array',
            'champs.*.id' => 'required|exists:champs,id',
            'champs.*.ordre' => 'required|integer'
        ]);

        foreach ($request->champs as $champData) {
            Champ::where('id', $champData['id'])->update(['ordre' => $champData['ordre']]);
        }

        return response()->json(['message' => 'Ordre mis à jour']);
    }
}
