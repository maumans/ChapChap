<?php

namespace App\Http\Controllers;

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

        return Inertia::render('Annonce/Index');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $categories = Categorie::where('status', true)->whereDoesntHave('categories')->with('categorie')->get(['id','nom']);
        $devises = Devise::where('status', true)->get();

        return Inertia::render('Annonce/Create',
        [
            "categories" => $categories,
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
