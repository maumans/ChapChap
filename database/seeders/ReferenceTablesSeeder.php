<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReferenceTablesSeeder extends Seeder
{
    public function run(): void
    {
        // Devises
        DB::table('devises')->insert([
            ['code' => 'GNF', 'nom' => 'Franc Guinéen', 'symbole' => 'FG'],
            ['code' => 'USD', 'nom' => 'Dollar Américain', 'symbole' => '$'],
            ['code' => 'EUR', 'nom' => 'Euro', 'symbole' => '€'],
            ['code' => 'XOF', 'nom' => 'Franc CFA', 'symbole' => 'CFA'],
        ]);

        // Types d'annonces
        DB::table('type_annonces')->insert([
            ['nom' => 'Vente', 'description' => 'Annonce de vente'],
            ['nom' => 'Location', 'description' => 'Annonce de location'],
            ['nom' => 'Échange', 'description' => 'Annonce d\'échange'],
            ['nom' => 'Service', 'description' => 'Offre de service'],
        ]);

        // États
        DB::table('etats')->insert([
            ['nom' => 'Neuf', 'description' => 'Produit neuf, jamais utilisé'],
            ['nom' => 'Excellent', 'description' => 'Comme neuf, très peu utilisé'],
            ['nom' => 'Très bon', 'description' => 'Légères traces d\'utilisation'],
            ['nom' => 'Bon', 'description' => 'Traces d\'utilisation normales'],
            ['nom' => 'Acceptable', 'description' => 'Traces d\'utilisation visibles'],
        ]);

        // Couleurs
        DB::table('couleurs')->insert([
            ['nom' => 'Noir', 'code_hex' => '#000000'],
            ['nom' => 'Blanc', 'code_hex' => '#FFFFFF'],
            ['nom' => 'Rouge', 'code_hex' => '#FF0000'],
            ['nom' => 'Bleu', 'code_hex' => '#0000FF'],
            ['nom' => 'Vert', 'code_hex' => '#00FF00'],
            ['nom' => 'Jaune', 'code_hex' => '#FFFF00'],
            ['nom' => 'Gris', 'code_hex' => '#808080'],
            ['nom' => 'Or', 'code_hex' => '#FFD700'],
            ['nom' => 'Argent', 'code_hex' => '#C0C0C0'],
        ]);

        // Résolutions
        DB::table('resolutions')->insert([
            ['nom' => 'HD', 'description' => 'Haute Définition', 'largeur' => 1280, 'hauteur' => 720],
            ['nom' => 'Full HD', 'description' => 'Full Haute Définition', 'largeur' => 1920, 'hauteur' => 1080],
            ['nom' => '2K', 'description' => 'Quad HD', 'largeur' => 2560, 'hauteur' => 1440],
            ['nom' => '4K', 'description' => 'Ultra HD', 'largeur' => 3840, 'hauteur' => 2160],
            ['nom' => '8K', 'description' => 'Ultra HD', 'largeur' => 7680, 'hauteur' => 4320],
        ]);

        // Connectivités
        DB::table('connectivites')->insert([
            ['nom' => 'WiFi', 'version' => '6', 'description' => 'WiFi 6 (802.11ax)'],
            ['nom' => 'Bluetooth', 'version' => '5.0', 'description' => 'Bluetooth 5.0'],
            ['nom' => '4G', 'version' => 'LTE', 'description' => '4G LTE'],
            ['nom' => '5G', 'version' => null, 'description' => '5G'],
            ['nom' => 'USB', 'version' => '3.0', 'description' => 'USB 3.0'],
            ['nom' => 'HDMI', 'version' => '2.1', 'description' => 'HDMI 2.1'],
        ]);

        // Marques populaires
        DB::table('marques')->insert([
            // Téléphones et tablettes
            ['nom' => 'Samsung', 'description' => 'Marque de téléphones et électronique'],
            ['nom' => 'Apple', 'description' => 'Marque de téléphones et électronique'],
            ['nom' => 'Xiaomi', 'description' => 'Marque de téléphones et électronique'],
            ['nom' => 'Huawei', 'description' => 'Marque de téléphones et électronique'],
            ['nom' => 'Oppo', 'description' => 'Marque de téléphones'],
            ['nom' => 'Tecno', 'description' => 'Marque de téléphones'],
            ['nom' => 'Infinix', 'description' => 'Marque de téléphones'],
            ['nom' => 'Itel', 'description' => 'Marque de téléphones'],
            
            // TV et électroménager
            ['nom' => 'LG', 'description' => 'Marque d\'électronique et électroménager'],
            ['nom' => 'Sony', 'description' => 'Marque d\'électronique'],
            ['nom' => 'TCL', 'description' => 'Marque de TV'],
            ['nom' => 'Hisense', 'description' => 'Marque de TV et électroménager'],
            ['nom' => 'Whirlpool', 'description' => 'Marque d\'électroménager'],
            ['nom' => 'Haier', 'description' => 'Marque d\'électroménager'],
        ]);

        // Matériaux
        DB::table('materiaux')->insert([
            ['nom' => 'Bois', 'description' => 'Matériau naturel'],
            ['nom' => 'Métal', 'description' => 'Matériau métallique'],
            ['nom' => 'Verre', 'description' => 'Matériau transparent'],
            ['nom' => 'Plastique', 'description' => 'Matériau synthétique'],
            ['nom' => 'Tissu', 'description' => 'Matériau textile'],
            ['nom' => 'Cuir', 'description' => 'Matériau naturel'],
        ]);
    }
}
