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
        // Devises (monnaies)
        Schema::create('devises', function (Blueprint $table) {
            $table->id();
            $table->string('code'); // GNF, USD, EUR, etc.
            $table->string('nom');
            $table->string('symbole')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Types d'annonces (vente, location, etc.)
        Schema::create('type_annonces', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Marques
        Schema::create('marques', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->string('logo_url')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Modèles
        Schema::create('modeles', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->foreignId('marque_id')->constrained('marques')->cascadeOnDelete();
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Formats (tailles, dimensions)
        Schema::create('formats', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Résolutions
        Schema::create('resolutions', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // HD, Full HD, 4K, etc.
            $table->string('description')->nullable();
            $table->integer('largeur')->nullable(); // ex: 1920
            $table->integer('hauteur')->nullable(); // ex: 1080
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Couleurs
        Schema::create('couleurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('code_hex')->nullable(); // Code couleur hexadécimal
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Accessoires
        Schema::create('accessoires', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Genres
        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Matériaux
        Schema::create('materiaux', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Connectivités
        Schema::create('connectivites', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // WiFi, Bluetooth, USB, etc.
            $table->string('version')->nullable(); // 5.0, 2.0, etc.
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // Fonctionnalités
        Schema::create('fonctionnalites', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });

        // États
        Schema::create('etats', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etats');
        Schema::dropIfExists('fonctionnalites');
        Schema::dropIfExists('connectivites');
        Schema::dropIfExists('materiaux');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('accessoires');
        Schema::dropIfExists('couleurs');
        Schema::dropIfExists('resolutions');
        Schema::dropIfExists('formats');
        Schema::dropIfExists('modeles');
        Schema::dropIfExists('marques');
        Schema::dropIfExists('type_annonces');
        Schema::dropIfExists('devises');
    }
};
