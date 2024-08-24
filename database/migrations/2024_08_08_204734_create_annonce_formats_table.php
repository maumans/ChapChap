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
        Schema::create('annonce_formats', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->foreignId('annonce_id')->nullable()->constrained('annonces')->cascadeOnDelete();
            $table->foreignId('format_id')->nullable()->constrained('formats')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonce_formats');
    }
};
