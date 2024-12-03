<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use App\Models\Categorie;
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
        $annonces = Annonce::where('status', true)->paginate(10);

        return Inertia::render('Admin/Annonce/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $categoriesGroup = Categorie::where('status', true)->whereDoesntHave('categories')->with('categorie')->get(['id','nom',"categorie_id"]);
        $devises = Devise::where('status', true)->get();

        return Inertia::render('Admin/Annonce/Create',
            [
                "categoriesGroup" => $categoriesGroup,
                "devises" => $devises,
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
