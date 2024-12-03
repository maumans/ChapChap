<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    public function index(Request $request)
    {
        $query = Categorie::with('champs'); // Inclure les champs associés

        if ($request->has('filter')) {
            $filter = $request->input('filter');
            $query->where('nom', 'like', '%' . $filter . '%');
        }

        $categories = $query->paginate($request->pageSize ??10);

        return Inertia::render('Admin/Categorie/Index', [
            'categories' => $categories,
        ]);
    }

    public function champsManagement($id)
    {
        $categorie=Categorie::where('id',$id)->with(['champs'])->first();

        return Inertia::render('Admin/Categorie/ChampsManagement',[
            'categorie' => $categorie
        ]);
    }

    public function updateChampsOrdre(Request $request, Categorie $categorie)
    {
        $champs = $request->input('champs', []);

        // Parcourir chaque champ et mettre à jour l'ordre
        foreach ($champs as $champData) {
            $categorie->champs()->updateExistingPivot($champData['id'], ['ordre' => $champData['ordre']]);
        }

        return redirect()->back()->with('success', 'Ordre des champs mis à jour avec succès.');
    }
}
