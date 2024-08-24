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
        Schema::create('annonce_materiaus', function (Blueprint $table) {
            $table->id();
            $table->boolean('status')->default(true)->nullable();
            $table->foreignId('annonce_id')->nullable()->constrained('annonces')->cascadeOnDelete();
            $table->foreignId('materiau_id')->nullable()->constrained('materiaus')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonce_materiaus');
    }
};
