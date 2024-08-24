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
        Schema::create('annonce_tailles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('annonce_id')->nullable()->constrained('annonces')->cascadeOnDelete();
            $table->foreignId('taille_id')->nullable()->constrained('tailles')->cascadeOnDelete();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonce_tailles');
    }
};
