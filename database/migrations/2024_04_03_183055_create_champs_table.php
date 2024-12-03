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
        Schema::create('champs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('label');
            $table->string('type');
            $table->text('placeholder')->nullable();
            $table->text('description')->nullable();
            $table->json('options')->nullable();
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('champs');
    }
};
