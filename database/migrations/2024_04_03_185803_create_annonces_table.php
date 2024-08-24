<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date')->nullable();
            $table->string('titre')->nullable();
            $table->double('prix')->nullable();
            $table->foreignId('devise_id')->nullable()->constrained('devises')->cascadeOnDelete();
            $table->longText('description')->nullable();
            $table->string('adresse')->nullable();

            $table->integer('nombreArticle')->nullable();

            $table->string('telephone')->nullable();
            $table->string('whatsApp')->nullable();
            $table->string('facebook')->nullable();

            $table->foreignId('type_annonce_id')->nullable()->constrained('type_annonces')->cascadeOnDelete();
            $table->foreignId('annonciateur_id')->nullable()->constrained('users')->cascadeOnDelete();

            $table->foreignId('marque_id')->nullable()->constrained('marques')->cascadeOnDelete();
            $table->foreignId('modele_id')->nullable()->constrained('modeles')->cascadeOnDelete();

            $table->foreignId('format_id')->nullable()->constrained('formats')->cascadeOnDelete();
            $table->foreignId('resolution_id')->nullable()->constrained('resolutions')->cascadeOnDelete();
            $table->foreignId('couleur_id')->nullable()->constrained('couleurs')->cascadeOnDelete();
            $table->foreignId('accessoire_id')->nullable()->constrained('accessoires')->cascadeOnDelete();
            $table->foreignId('genre_id')->nullable()->constrained('genres')->cascadeOnDelete();
            $table->foreignId('materiau_id')->nullable()->constrained('materiaux')->cascadeOnDelete();
            $table->foreignId('connectivite_id')->nullable()->constrained('connectivites')->cascadeOnDelete();
            $table->foreignId('fonctionnalite_id')->nullable()->constrained('fonctionnalites')->cascadeOnDelete();

            $table->foreignId('etat_id')->nullable()->constrained('etats')->cascadeOnDelete();
            $table->foreignId('categorie_id')->nullable()->constrained('categories')->cascadeOnDelete();
            $table->foreignId('produit_id')->nullable()->constrained('produits')->cascadeOnDelete();

            $table->string('kilometrage')->nullable(); // For category "voiture"
            $table->date('annee_creation')->nullable(); // For categories like "voiture", "television", etc.
            $table->string('systeme_sante')->nullable(); // For category "sante et beaute"
            $table->string('age')->nullable(); // For category "bebe et soin des enfants"
            $table->string('poids')->nullable(); // For category "bebe et soin des enfants"

            $table->string('capacite')->nullable(); // For categories like "tablettes", "telephones et accessoires", etc.
            $table->string('source_energie')->nullable(); // For categories like "gros electromenager", "petit electromenager", etc.
            $table->string('type_cuisine')->nullable(); // For categories like "cuisine et maison"
            $table->string('style')->nullable(); // For categories like "meubles et deco", "maison et bureau", etc.
            $table->string('dimension')->nullable(); // For categories like "meubles et deco", "maison et bureau", etc.
            $table->string('unite')->nullable(); // For categories like "meubles et deco", "maison et bureau", etc.
            $table->string('forme')->nullable(); // For categories like "meubles et deco", "maison et bureau", etc.
            $table->longText('caracteristique')->nullable(); // For categories like "maison et bureau", "meubles et deco", etc.
            $table->string('utilisation')->nullable(); // For categories like "maison et bureau", "meubles et deco", etc.
            $table->string('fonctions')->nullable(); // For categories like "electronique", "informatique", etc.

            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonces');
    }
};
