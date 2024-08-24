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
        Schema::create('annonce_resolutions', function (Blueprint $table) {
            $table->id();
            $table->boolean('status')->default(true)->nullable();
            $table->foreignId('annonce_id')->nullable()->constrained('annonces')->cascadeOnDelete();
            $table->foreignId('resolution_id')->nullable()->constrained('resolutions')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonce_resolutions');
    }
};
