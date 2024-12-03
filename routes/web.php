<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Routes publiques
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('accueil');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Routes pour les annonces publiques
Route::resource('categorie', \App\Http\Controllers\CategorieController::class)->only(['index', 'show']);
Route::resource('annonce', \App\Http\Controllers\AnnonceController::class)->only(['index', 'show','create']);
Route::resource('annonce', \App\Http\Controllers\AnnonceController::class)->only(['store']);
Route::post('annonce/categoriechamps', [\App\Http\Controllers\AnnonceController::class, 'categorieChamps'])->name("annonce.categorieChamps");

// Routes nécessitant une authentification
Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Routes pour la gestion des annonces par l'utilisateur
    /* Route::resource('annonce', \App\Http\Controllers\AnnonceController::class)
        ->except(['index', 'show','create']); */

});

// Routes d'administration
Route::middleware(['auth'])->group(function () {
    //Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('admin.dashboard', \App\Http\Controllers\Admin\DashboardController::class);
    
    // Gestion des annonces admin
    Route::resource('admin.annonce', \App\Http\Controllers\Admin\AnnonceController::class);
    
    // Gestion des catégories admin
    Route::resource('admin.categorie', \App\Http\Controllers\Admin\CategorieController::class)->except('show');
    Route::get('/categories/{categorie}/champsManagement', 
        [\App\Http\Controllers\Admin\CategorieController::class, 'champsManagement'])
        ->name("categorie.champsManagement");
    Route::post('/categories/{categorie}/updateChampsOrdre', 
        [\App\Http\Controllers\Admin\CategorieController::class, 'updateChampsOrdre'])
        ->name("categorie.updateChampsOrdre");
});

require __DIR__.'/auth.php';
