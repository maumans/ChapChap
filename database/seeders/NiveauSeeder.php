<?php

namespace Database\Seeders;

use App\Models\Niveau;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NiveauSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("niveaux")->delete();

        Niveau::create([
            'designation'=>1
        ]);

        Niveau::create([
            'designation'=>2
        ]);

        Niveau::create([
            'designation'=>3
        ]);

        Niveau::create([
            'designation'=>4
        ]);

        Niveau::create([
            'designation'=>5
        ]);
    }
}
