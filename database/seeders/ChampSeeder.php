<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Champ;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChampSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('champs')->delete();
        DB::table('categorie_champ')->delete();

        // Champs spécifiques pour les smartphones et tablettes
        $champsElectronique = [
            $this->createChamp('stockage', 'Capacité de stockage', 'select', 'Sélectionnez la capacité', [
                ['value' => '16', 'label' => '16 Go'],
                ['value' => '32', 'label' => '32 Go'],
                ['value' => '64', 'label' => '64 Go'],
                ['value' => '128', 'label' => '128 Go'],
                ['value' => '256', 'label' => '256 Go'],
                ['value' => '512', 'label' => '512 Go'],
                ['value' => '1024', 'label' => '1 To'],
            ]),
            $this->createChamp('ram', 'Mémoire RAM', 'select', 'Sélectionnez la RAM', [
                ['value' => '2', 'label' => '2 Go'],
                ['value' => '3', 'label' => '3 Go'],
                ['value' => '4', 'label' => '4 Go'],
                ['value' => '6', 'label' => '6 Go'],
                ['value' => '8', 'label' => '8 Go'],
                ['value' => '12', 'label' => '12 Go'],
                ['value' => '16', 'label' => '16 Go'],
            ]),
            $this->createChamp('systeme_exploitation', 'Système d\'exploitation', 'select', 'Sélectionnez l\'OS', [
                ['value' => 'android', 'label' => 'Android'],
                ['value' => 'ios', 'label' => 'iOS'],
                ['value' => 'harmonyos', 'label' => 'HarmonyOS'],
            ]),
            $this->createChamp('garantie', 'Garantie', 'select', 'Sélectionnez la garantie', [
                ['value' => 'sans', 'label' => 'Sans garantie'],
                ['value' => '3mois', 'label' => '3 mois'],
                ['value' => '6mois', 'label' => '6 mois'],
                ['value' => '1an', 'label' => '1 an'],
            ]),
        ];

        // Champs spécifiques pour les véhicules
        $champsVehicules = [
            $this->createChamp('carburant', 'Type de carburant', 'select', 'Sélectionnez le carburant', [
                ['value' => 'essence', 'label' => 'Essence'],
                ['value' => 'diesel', 'label' => 'Diesel'],
                ['value' => 'hybride', 'label' => 'Hybride'],
                ['value' => 'electrique', 'label' => 'Électrique'],
            ]),
            $this->createChamp('transmission', 'Transmission', 'select', 'Sélectionnez la transmission', [
                ['value' => 'manuelle', 'label' => 'Manuelle'],
                ['value' => 'automatique', 'label' => 'Automatique'],
            ]),
            $this->createChamp('puissance', 'Puissance (CV)', 'number', 'Entrez la puissance en CV'),
            $this->createChamp('garantie', 'Garantie', 'select', 'Sélectionnez la garantie', [
                ['value' => 'sans', 'label' => 'Sans garantie'],
                ['value' => '3mois', 'label' => '3 mois'],
                ['value' => '6mois', 'label' => '6 mois'],
                ['value' => '1an', 'label' => '1 an'],
            ]),
        ];

        // Champs spécifiques pour l'électroménager
        $champsElectromenager = [
            $this->createChamp('classe_energetique', 'Classe énergétique', 'select', 'Sélectionnez la classe', [
                ['value' => 'a', 'label' => 'A'],
                ['value' => 'b', 'label' => 'B'],
                ['value' => 'c', 'label' => 'C'],
                ['value' => 'd', 'label' => 'D'],
                ['value' => 'e', 'label' => 'E'],
            ]),
            $this->createChamp('programme', 'Programmes', 'multiselect', 'Sélectionnez les programmes', [
                ['value' => 'eco', 'label' => 'Éco'],
                ['value' => 'rapide', 'label' => 'Rapide'],
                ['value' => 'intensif', 'label' => 'Intensif'],
            ]),
            $this->createChamp('garantie', 'Garantie', 'select', 'Sélectionnez la garantie', [
                ['value' => 'sans', 'label' => 'Sans garantie'],
                ['value' => '3mois', 'label' => '3 mois'],
                ['value' => '6mois', 'label' => '6 mois'],
                ['value' => '1an', 'label' => '1 an'],
            ]),
        ];

        // Champs spécifiques pour l'immobilier
        $champsImmobilier = [
            $this->createChamp('surface', 'Surface (m²)', 'number', 'Entrez la surface'),
            $this->createChamp('pieces', 'Nombre de pièces', 'number', 'Entrez le nombre de pièces'),
            $this->createChamp('type_bien', 'Type de bien', 'select', 'Sélectionnez le type', [
                ['value' => 'appartement', 'label' => 'Appartement'],
                ['value' => 'maison', 'label' => 'Maison'],
                ['value' => 'terrain', 'label' => 'Terrain'],
                ['value' => 'bureau', 'label' => 'Bureau'],
                ['value' => 'commerce', 'label' => 'Commerce'],
            ]),
        ];

        // Associer les champs aux catégories spécifiques
        $this->attachFieldsToCategory('téléphones et tablettes', $champsElectronique);
        $this->attachFieldsToCategory('smartphones', $champsElectronique);
        $this->attachFieldsToCategory('tablettes', $champsElectronique);
        $this->attachFieldsToCategory('ordinateurs portables', $champsElectronique);

        $this->attachFieldsToCategory('voitures', $champsVehicules);
        $this->attachFieldsToCategory('motos', $champsVehicules);
        $this->attachFieldsToCategory('véhicules', $champsVehicules);

        $this->attachFieldsToCategory('électroménager', $champsElectromenager);
        $this->attachFieldsToCategory('réfrigérateurs', $champsElectromenager);
        $this->attachFieldsToCategory('machines à laver', $champsElectromenager);

        $this->attachFieldsToCategory('immobilier', $champsImmobilier);
        $this->attachFieldsToCategory('locations', $champsImmobilier);
        $this->attachFieldsToCategory('ventes', $champsImmobilier);
    }

    private function createChamp($nom, $label, $type, $placeholder, $options = null): Champ
    {
        return Champ::create([
            'nom' => $nom,
            'label' => $label,
            'type' => $type,
            'placeholder' => $placeholder,
            'options' => $options,
        ]);
    }

    private function attachFieldsToCategory($categoryName, $fields)
    {
        $category = Categorie::where('nom', $categoryName)->first();
        if ($category) {
            foreach ($fields as $field) {
                $category->champs()->attach($field->id);
            }
        }
    }
}
