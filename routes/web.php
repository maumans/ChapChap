<?php

use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\DataDeletionController;
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
    

    // Gestion des champs
    Route::resource('admin.champs', \App\Http\Controllers\Admin\ChampController::class);
    Route::post('admin/champs/update-order', [\App\Http\Controllers\Admin\ChampController::class, 'updateOrder'])
        ->name('admin.champs.updateOrder');

    // Gestion des catégories admin
    Route::resource('admin.categorie', \App\Http\Controllers\Admin\CategorieController::class)->except('show');
    Route::get('admin/{admin}/categories/{categorie}/champs', 
        [\App\Http\Controllers\Admin\CategorieController::class, 'champsManagement'])
        ->name('admin.categorie.champsManagement');
    Route::post('admin/{admin}/categories/{categorie}/champs/ordre', 
        [\App\Http\Controllers\Admin\CategorieController::class, 'updateChampsOrdre'])
        ->name('admin.categorie.updateChampsOrdre');
});

// Routes pour l'authentification sociale
Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirectToProvider'])
    ->name('social.login');
Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback'])
    ->name('social.callback');

// Routes pour la suppression des données Facebook
Route::match(['get', 'post'], '/data-deletion', [DataDeletionController::class, 'show'])->name('data-deletion');
Route::get('/data-deletion/status/{id}', [DataDeletionController::class, 'status'])->name('data-deletion.status');

require __DIR__.'/auth.php';
