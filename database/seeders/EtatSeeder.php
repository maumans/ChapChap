<?php

namespace Database\Seeders;

use App\Models\Etat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EtatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('etats')->delete();

        Etat::create([
           'libelle' =>'Neuf avec étiquette',
           'description' =>"Article neuf, jamais porté/utilisé avec étiquettes ou dans son emballage d'origine.",
        ]);

        Etat::create([
            'libelle' =>'Neuf sans étiquette',
            'description' =>"Article neuf, jamais porté/utilisé sans étiquettes ni emballage d'origine.",
        ]);

        Etat::create([
            'libelle' =>'Très bon état',
            'description' =>"Un article très peu porté/utilisé qui peut avoir de légères imperfections, mais qui reste en très bon état. Précise avec des photos et une description détaillés, les défauts de ton article.",
        ]);

        Etat::create([
            'libelle' =>'Bon état',
            'description' =>"Un article porté/utilisé quelques fois, montre des imperfections et des signes d'usure. Précise avec des photos et une description detaillée, les défauts de ton article.",
        ]);
    }
}
