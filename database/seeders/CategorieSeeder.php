<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Niveau;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("categories")->delete();

        $n1=Niveau::where("designation",1)->first();
        $n2=Niveau::where("designation",2)->first();
        $n3=Niveau::where("designation",3)->first();
        $n4=Niveau::where("designation",4)->first();
        $n5=Niveau::where("designation",5)->first();

        $telephonesEtTablettes=Categorie::create([
            'nom'=>'téléphones et tablettes',
            'niveau_id'=>$n1->id,
        ]);

        ////////////////////////////////
        $telephonePortable=Categorie::create([
            'nom'=>'téléphone portable',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$telephonesEtTablettes->id,
        ]);

        $smartphones=Categorie::create([
            'nom'=>'smartphones',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$telephonePortable->id,
        ]);

        $telephonesBasiques=Categorie::create([
            'nom'=>'téléphone basiques',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$telephonePortable->id,
        ]);

        ////////////////////////////////

        $tablettes=Categorie::create([
            'nom'=>'tablettes',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$telephonesEtTablettes->id,
        ]);
        $accessoiresTablette=Categorie::create([
            'nom'=>'accessoires de tablette',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$tablettes->id,
        ]);

        $tablettesEducatives=Categorie::create([
            'nom'=>'tablettes éducatives',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$tablettes->id,
        ]);

        $tablettesIpad=Categorie::create([
            'nom'=>'tablettes Ipad',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$tablettes->id,
        ]);

        ////////////////////////////////

        $accessoiresTelephone=Categorie::create([
            'nom'=>'accéssoires téléphone',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$telephonesEtTablettes->id,
        ]);

        $accessoiresBluetooth=Categorie::create([
            'nom'=>'accessoires bluetooth',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $batterieTelephone=Categorie::create([
            'nom'=>'batteries téléphones',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $cartesMemoire=Categorie::create([
            'nom'=>'cartes mémoire',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $chargeursEtAdaptateurs=Categorie::create([
            'nom'=>'chargeurs et adaptateurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $chargeursTelephone=Categorie::create([
            'nom'=>'chargeurs téléphones',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $coques=Categorie::create([
            'nom'=>'coques',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $cables=Categorie::create([
            'nom'=>'cables',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $filmsEtProtection=Categorie::create([
            'nom'=>'films et protection',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $montresIntelligentes=Categorie::create([
            'nom'=>'montres intelligentes',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $ecouteursJack=Categorie::create([
            'nom'=>'écouteurs jack',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        $ecouteursBluetooth=Categorie::create([
            'nom'=>'écouteurs bluetooth',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresTelephone->id,
        ]);

        ////////////////////////////////

        $telephonesEtAccessoires=Categorie::create([
            'nom'=>'téléphones et accessoires',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$telephonesEtTablettes->id,
        ]);

        $telephonesFixes=Categorie::create([
            'nom'=>'téléphone fixes',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$telephonesEtAccessoires->id,
        ]);


        ////////////////////////////////
        ///
        $electronique=Categorie::create([
            'nom'=>'électronique',
            'niveau_id'=>$n1->id,
        ]);

        ////////////////////////////////
        $tvVideoEtHomeCinema=Categorie::create([
            'nom'=>'tv, vidéo et home cinéma',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electronique->id,
        ]);

        $televisions=Categorie::create([
            'nom'=>'télévisions',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$tvVideoEtHomeCinema->id,
        ]);

        $boitesDeReceptionDeCable=Categorie::create([
            'nom'=>'boites de réception de cables',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$tvVideoEtHomeCinema->id,
        ]);

        $lecteursEtEnregistreurs=Categorie::create([
            'nom'=>'lecteurs et enregistreurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$tvVideoEtHomeCinema->id,
        ]);

        ////////////////////////////////
        $accessoiresHighTech=Categorie::create([
            'nom'=>'accessoires high tech',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electronique->id,
        ]);

        $accessoiresImageEtSon=Categorie::create([
            'nom'=>'accessoires image et son',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresHighTech->id,
        ]);

        $accessoiresPhotoEtCamescopeqs=Categorie::create([
            'nom'=>'accessoires photo et caméscopes',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresHighTech->id,
        ]);

        $accessoiresTv=Categorie::create([
            'nom'=>'accessoires TV',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresHighTech->id,
        ]);

        $batteriesChargeursEtAccessoires=Categorie::create([
            'nom'=>'batteries chargeurs et accessoires',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresHighTech->id,
        ]);

        //////
        $appareilPhotoEtCameras=Categorie::create([
            'nom'=>'appareil photo et caméras',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electronique->id,
        ]);

        $camerasDigitales=Categorie::create([
            'nom'=>'caméras digitales',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$appareilPhotoEtCameras->id,
        ]);

        $video=Categorie::create([
            'nom'=>'vidéo',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$appareilPhotoEtCameras->id,
        ]);

        //////
        $audioEtHifi=Categorie::create([
            'nom'=>'appareil photo et caméras',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electronique->id,
        ]);

        $hautParleurs=Categorie::create([
            'nom'=>'haut-parleurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$audioEtHifi->id,
        ]);

        $homeCinema=Categorie::create([
            'nom'=>'home cinéma',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$audioEtHifi->id,
        ]);

        //////
        $audioEtVideoPortables=Categorie::create([
            'nom'=>'appareil et vidéo portables',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electronique->id,
        ]);

        $accessoiresLecteurMp3=Categorie::create([
            'nom'=>'accessoires lecteur MP3',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$audioEtVideoPortables->id,
        ]);

        $lecteursDvdPortables=Categorie::create([
            'nom'=>'lecteurs DVD portables',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$audioEtVideoPortables->id,
        ]);

        $lecteursMp3EtIpods=Categorie::create([
            'nom'=>'lecteur MP3 et iPods',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$audioEtVideoPortables->id,
        ]);

        //////
        $securiteEtSurveillance=Categorie::create([
            'nom'=>'sécurité et surveillance',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electronique->id,
        ]);

        $equipementDeVideoDeSurveillance=Categorie::create([
            'nom'=>'équipement de vidéo de surveillance',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$securiteEtSurveillance->id,
        ]);



        ////////////////////////////////

        $electromenager=Categorie::create([
            'nom'=>'électroménager',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $grosElectomenager=Categorie::create([
            'nom'=>'gros electroménager',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electromenager->id,
        ]);

        $appareilsDeCuisson=Categorie::create([
            'nom'=>'appareils de cuisson',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$grosElectomenager->id,
        ]);

        $gaziniere=Categorie::create([
            'nom'=>'gazinière',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$grosElectomenager->id,
        ]);

        $congelateurs=Categorie::create([
            'nom'=>'congélateurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$grosElectomenager->id,
        ]);

        $refrigerateurs=Categorie::create([
            'nom'=>'réfrigérateurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$grosElectomenager->id,
        ]);

        $laveusesEtSecheuses=Categorie::create([
            'nom'=>'laveuses et sécheuses',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$grosElectomenager->id,
        ]);

        //////
        $petitElectomenager=Categorie::create([
            'nom'=>'pétit electroménager',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electromenager->id,
        ]);

        $preparationDesBoissons=Categorie::create([
            'nom'=>'préparation des boissons',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$petitElectomenager->id,
        ]);

        $bouilloires=Categorie::create([
            'nom'=>'bouilloires',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$petitElectomenager->id,
        ]);

        $melangeursEtMixeurs=Categorie::create([
            'nom'=>'mélangeurs et mixeurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$petitElectomenager->id,
        ]);

        $repassageEtBlanchisserie=Categorie::create([
            'nom'=>'repassage et blanchisserie',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$petitElectomenager->id,
        ]);

        $aspirateurs=Categorie::create([
            'nom'=>'aspirateurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$petitElectomenager->id,
        ]);

        $autresPetitsAppareils=Categorie::create([
            'nom'=>'autres petits appareils',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$petitElectomenager->id,
        ]);

        //////
        $appareilMenagers=Categorie::create([
            'nom'=>'appareil ménagers',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$electromenager->id,
        ]);

        $appareilsDeCuisine=Categorie::create([
            'nom'=>'appareils de cuisine',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$appareilMenagers->id,
        ]);

        $appareilsDeSanteEtDeBeaute=Categorie::create([
            'nom'=>'appareils de santé et de beauté',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$appareilMenagers->id,
        ]);

        $luminairesEtEclairage=Categorie::create([
            'nom'=>'luminaires et éclairage',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$appareilMenagers->id,
        ]);

        $nettoyeursEtAspirateurs=Categorie::create([
            'nom'=>'nettoyeurs et aspirateurs',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$appareilMenagers->id,
        ]);

        $qualiteDeLairEtAppareilsSaisonniers=Categorie::create([
            'nom'=>"qualité de l'air et appareils saisonniers",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$appareilMenagers->id,
        ]);

        ////////////////////////////////////////////////////////////////

        $mode=Categorie::create([
            'nom'=>'mode',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $modeFemme=Categorie::create([
            'nom'=>'mode femme',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$mode->id,
        ]);

        $accessoiresFemme=Categorie::create([
            'nom'=>'accessoires femme',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $bijoux=Categorie::create([
            'nom'=>'bijoux',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $chaussures=Categorie::create([
            'nom'=>'chaussures',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $costumesEtAccessoires=Categorie::create([
            'nom'=>'costumes et accessoires',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $montresFemmes=Categorie::create([
            'nom'=>'montres femmes',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $sacsAmainEtPortefeuilles=Categorie::create([
            'nom'=>'sacs à main et portefeuilles',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $sousVetementsEtVetementsDeNuit=Categorie::create([
            'nom'=>'Sous-vêtements et vêtements de nuit',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $vetements=Categorie::create([
            'nom'=>'vêtements',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $vetementsGrandesTailles=Categorie::create([
            'nom'=>'vêtements grandes tailles',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $vetementsDeMaternite=Categorie::create([
            'nom'=>'vêtements de maternité',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        $vetementsTraditionnelsEtCulturels=Categorie::create([
            'nom'=>'vêtements traditionnels et culturels',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeFemme->id,
        ]);

        //////
        $modeHomme=Categorie::create([
            'nom'=>'mode homme',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$mode->id,
        ]);

        $accessoiresHomme=Categorie::create([
            'nom'=>'accessoires homme',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeHomme->id,
        ]);

        $bijoux=Categorie::create([
            'nom'=>'bijoux',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeHomme->id,
        ]);

        $chaussures=Categorie::create([
            'nom'=>'chaussures',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeHomme->id,
        ]);

        $costumesEtAccessoires=Categorie::create([
            'nom'=>'costumes et accessoires',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeHomme->id,
        ]);

        $montresHommes=Categorie::create([
            'nom'=>'montres hommes',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeHomme->id,
        ]);
        $vetements=Categorie::create([
            'nom'=>'vêtements',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeHomme->id,
        ]);
        $vetementsTraditionnelsEtCulturels=Categorie::create([
            'nom'=>'vêtements traditionnels et culturels',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$modeHomme->id,
        ]);

        ////////////////////////////////////////////////////////////////

        $santeEtBeaute=Categorie::create([
            'nom'=>'Santé et beauté',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $beauteEtParfums=Categorie::create([
            'nom'=>'beauté et parfums',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $maquillage=Categorie::create([
            'nom'=>'maquillage',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$beauteEtParfums->id,
        ]);

        $outilsEtAccessoires=Categorie::create([
            'nom'=>'outils et accessoires',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$beauteEtParfums->id,
        ]);

        $soinsPersonnels=Categorie::create([
            'nom'=>'soins personnels',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$beauteEtParfums->id,
        ]);

        $parfums=Categorie::create([
            'nom'=>'parfums',
            'niveau_id'=>$n3->id,
            'categorie_id'=>$beauteEtParfums->id,
        ]);

        //////
        $bienEtreEtMassage=Categorie::create([
            'nom'=>'bien-être et massage',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $moniteursDeConditionPhysiqueEtDactivite=Categorie::create([
            'nom'=>"moniteurs de condition physique et d'activité",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bienEtreEtMassage->id,
        ]);

        $outilsEtEquipementsDeMassage=Categorie::create([
            'nom'=>"outils et équipements de massage",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bienEtreEtMassage->id,
        ]);

        $aromatherapie=Categorie::create([
            'nom'=>"aromathérapie",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bienEtreEtMassage->id,
        ]);

        //////
        $hygieneEtSoinsPersonnels=Categorie::create([
            'nom'=>'hygiène et soins personnels',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $accessoiresEtProduitsPourLeBain=Categorie::create([
            'nom'=>"accessoires et produits pour le bain",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$hygieneEtSoinsPersonnels->id,
        ]);

        $deodorantsEtAntiTranspirants=Categorie::create([
            'nom'=>"déodorants et anti-transpirants",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$hygieneEtSoinsPersonnels->id,
        ]);

        $rasageEtEpilation=Categorie::create([
            'nom'=>"rasage et épilation",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$hygieneEtSoinsPersonnels->id,
        ]);

        $soinDeLaPeau=Categorie::create([
            'nom'=>"soin de la peau",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$hygieneEtSoinsPersonnels->id,
        ]);

        $soinDesCheveux=Categorie::create([
            'nom'=>"soin des cheveux",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$hygieneEtSoinsPersonnels->id,
        ]);

        //////
        $bebeEtSoinDesEnfants=Categorie::create([
            'nom'=>'bébé et soin des enfants',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $santeBebe=Categorie::create([
            'nom'=>"santé bébé",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bebeEtSoinDesEnfants->id,
        ]);

        //////
        $santeEtPremiersSoins=Categorie::create([
            'nom'=>'santé et premiers soins',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $fertiliteEtTestsGrossesse=Categorie::create([
            'nom'=>"fertilité et tests grossesse",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$santeEtPremiersSoins->id,
        ]);

        $hygieneFeminine=Categorie::create([
            'nom'=>"hygiène féminine",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$santeEtPremiersSoins->id,
        ]);

        $laSanteDesPieds=Categorie::create([
            'nom'=>"la santé des pieds",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$santeEtPremiersSoins->id,
        ]);

        $premiersSecours=Categorie::create([
            'nom'=>"premiers secours",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$santeEtPremiersSoins->id,
        ]);

        $soinsDesOreilles=Categorie::create([
            'nom'=>"soins des oreilles",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$santeEtPremiersSoins->id,
        ]);

        //////
        $fournituresEtEquipementsMedicaux=Categorie::create([
            'nom'=>'fournitures et équipements médicaux',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $moniteursDeSante=Categorie::create([
            'nom'=>"moniteurs de santé",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$fournituresEtEquipementsMedicaux->id,
        ]);

        //////
        $optiqueEtLentillesDeContact=Categorie::create([
            'nom'=>'optique et lentilles de contact',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $gouttesPourLesYeuxLubrifiantsEtLavages=Categorie::create([
            'nom'=>"gouttes pour les yeux lubrifiants et lavages",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$optiqueEtLentillesDeContact->id,
        ]);

        //////
        $vitaminesEtSupplementsDietetiques=Categorie::create([
            'nom'=>'vitamines et supplements diététiques',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $vitamines=Categorie::create([
            'nom'=>"vitamines",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$vitaminesEtSupplementsDietetiques->id,
        ]);

        $supplements=Categorie::create([
            'nom'=>"suppléments",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$vitaminesEtSupplementsDietetiques->id,
        ]);

        $perteDePoids=Categorie::create([
            'nom'=>"perte de poids",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$vitaminesEtSupplementsDietetiques->id,
        ]);

        //////
        $nutritionSportive=Categorie::create([
            'nom'=>'nutrition sportive',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$santeEtBeaute->id,
        ]);

        $accessoires=Categorie::create([
            'nom'=>"accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$nutritionSportive->id,
        ]);

        $enduranceEtEnergie=Categorie::create([
            'nom'=>"endurance et énergie",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$nutritionSportive->id,
        ]);

        $proteine=Categorie::create([
            'nom'=>"protéine",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$nutritionSportive->id,
        ]);


        ////////////////////////////////////////////////////////////////

        $informatique=Categorie::create([
            'nom'=>'informatique',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $ordinateursEtImprimantes=Categorie::create([
            'nom'=>'ordinateurs et imprimantes',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$informatique->id,
        ]);

        $accessoiresPourOrdinateurPortable=Categorie::create([
            'nom'=>"accessoires pour ordinateur portable",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$ordinateursEtImprimantes->id,
        ]);

        $composantsPC=Categorie::create([
            'nom'=>"composants PC",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$ordinateursEtImprimantes->id,
        ]);

        $imprimantes=Categorie::create([
            'nom'=>"imprimantes",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$ordinateursEtImprimantes->id,
        ]);

        $ordinateurs=Categorie::create([
            'nom'=>"ordinateurs",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$ordinateursEtImprimantes->id,
        ]);

        $scanners=Categorie::create([
            'nom'=>"scanners",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$ordinateursEtImprimantes->id,
        ]);

        $solutionsReseaux=Categorie::create([
            'nom'=>"solutions réseaux",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$ordinateursEtImprimantes->id,
        ]);

        $stockageDeDonnees=Categorie::create([
            'nom'=>"stockage de données",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$ordinateursEtImprimantes->id,
        ]);

        //////
        $accessoiresIT=Categorie::create([
            'nom'=>'accessoires IT',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$informatique->id,
        ]);

        $accessoiresAudioEtVideo=Categorie::create([
            'nom'=>"accessoires audio et vidéo",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresIT->id,
        ]);

        $claviersEtSourisPC=Categorie::create([
            'nom'=>"claviers et souris PC",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresIT->id,
        ]);

        $clablesEtInterconnexions=Categorie::create([
            'nom'=>"Câbles et interconnexions",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresIT->id,
        ]);

        $encreDimprimante=Categorie::create([
            'nom'=>"encre d'imprimante",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$accessoiresIT->id,
        ]);

        //////
        $logiciel=Categorie::create([
            'nom'=>'logiciel',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$informatique->id,
        ]);

        $antivirusEtSecurite=Categorie::create([
            'nom'=>"antivirus et securité",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$logiciel->id,
        ]);

        $bureau=Categorie::create([
            'nom'=>"bureau",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$logiciel->id,
        ]);

        ////////////////////////////////////////////////////////////////

        $maisonEtBureau=Categorie::create([
            'nom'=>'maison et bureau',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $cuisineEtMaison=Categorie::create([
            'nom'=>'cuisine et maison',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$maisonEtBureau->id,
        ]);

        $artMural=Categorie::create([
            'nom'=>"art mural",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $articlesPourEvenement=Categorie::create([
            'nom'=>"articles pour evenement",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $aspirateursEtEntretienDesSols=Categorie::create([
            'nom'=>"aspirateurs et entretien des sols",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $chauffageEtVentilationr=Categorie::create([
            'nom'=>"chauffage et ventilation",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $decorationDeMaison=Categorie::create([
            'nom'=>"décoration de maison",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $ferArepasser=Categorie::create([
            'nom'=>"fer à repasser",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $fournituresDeNettoyage=Categorie::create([
            'nom'=>"fournitures de nettoyage",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $lampeLuminairesEtPlafonniers=Categorie::create([
            'nom'=>"lampe, luminaires et plafonniers",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $literie=Categorie::create([
            'nom'=>"literie",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $meubles=Categorie::create([
            'nom'=>"meubles",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $rangementsEtOrganisation=Categorie::create([
            'nom'=>"rangements et organisation",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        $saleDeBain=Categorie::create([
            'nom'=>"salleDeBain",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$cuisineEtMaison->id,
        ]);

        //////
        $maisonEtAmeublement=Categorie::create([
            'nom'=>'maison et ameublement',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$maisonEtBureau->id,
        ]);

        $meubles=Categorie::create([
            'nom'=>"meubles",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$maisonEtAmeublement->id,
        ]);

        //////
        $bricolageEtRenovation=Categorie::create([
            'nom'=>'bricolage et rénovation',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$maisonEtBureau->id,
        ]);

        $cuisinesEtSallesDeBain=Categorie::create([
            'nom'=>"cuisines et salles de bain",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bricolageEtRenovation->id,
        ]);

        $materiauxDeConstruction=Categorie::create([
            'nom'=>"matériaux de construction",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bricolageEtRenovation->id,
        ]);

        $outillageAmainEtElectroportatif=Categorie::create([
            'nom'=>"outillage à main et électroportatif",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bricolageEtRenovation->id,
        ]);

        $outilsDeMesureEtDeMiseEnPage=Categorie::create([
            'nom'=>"outils de mesure et de mise en page",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bricolageEtRenovation->id,
        ]);

        $peinturesOutilsEtTraitementDesMurs=Categorie::create([
            'nom'=>"peintures outils et traitement des murs",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bricolageEtRenovation->id,
        ]);

        $quincaillerie=Categorie::create([
            'nom'=>"quincaillerie",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bricolageEtRenovation->id,
        ]);

        $electricite=Categorie::create([
            'nom'=>"électricité",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bricolageEtRenovation->id,
        ]);

        //////
        $fournituresScolairesEtBureau=Categorie::create([
            'nom'=>'fournitures scolaires et bureau',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$maisonEtBureau->id,
        ]);

        $electroniqueDeBureau=Categorie::create([
            'nom'=>"electronique de bureau",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$fournituresScolairesEtBureau->id,
        ]);

        $mobilierDeBureauEtEclairage=Categorie::create([
            'nom'=>"mobilier de bureau et éclairage",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$fournituresScolairesEtBureau->id,
        ]);

        $papeterieEtPetitesFournitures=Categorie::create([
            'nom'=>"papeterie et petites fournitures",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$fournituresScolairesEtBureau->id,
        ]);

        /////////////////////////////////////////////////////////////////

        $jardinEtPleinair=Categorie::create([
            'nom'=>'jardin et plein air',
            'niveau_id'=>$n2->id,
        ]);

        //////
        $decorExterieur=Categorie::create([
            'nom'=>'décor extérieur',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jardinEtPleinair->id,
        ]);

        $fontaines=Categorie::create([
            'nom'=>"fontaines",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$decorExterieur->id,
        ]);

        $eclairage=Categorie::create([
            'nom'=>"éclairage",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$decorExterieur->id,
        ]);

        //////
        $grilladeEtBarbecue=Categorie::create([
            'nom'=>'grillade et barbecue',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jardinEtPleinair->id,
        ]);

        $outilsDeCuissonPleinAirEtAccessoires=Categorie::create([
            'nom'=>"outils de cuisson plein air et accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$grilladeEtBarbecue->id,
        ]);

        //////
        $meublesEtAccessoiresDePatio=Categorie::create([
            'nom'=>'meubles et accessoires de patio',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jardinEtPleinair->id,
        ]);

        $canopyGazebosEtPergolas=Categorie::create([
            'nom'=>"canopy, gazebos et pergolas",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$meublesEtAccessoiresDePatio->id,
        ]);
        $siegesDePatio=Categorie::create([
            'nom'=>"sièges de patio",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$meublesEtAccessoiresDePatio->id,
        ]);

        //////
        $outilsElectriquesExterieurs=Categorie::create([
            'nom'=>'outils électriques extérieurs',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jardinEtPleinair->id,
        ]);

        $tondeusesAgazonEtTracteurs=Categorie::create([
            'nom'=>"tondeuses à gazon et tracteurs",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$outilsElectriquesExterieurs->id,
        ]);

        //////
        $piscinesSpasEtFournitures=Categorie::create([
            'nom'=>'piscines, spas et fournitures',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jardinEtPleinair->id,
        ]);

        $piscines=Categorie::create([
            'nom'=>"piscines",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$piscinesSpasEtFournitures->id,
        ]);

        //////
        $stockageExterieur=Categorie::create([
            'nom'=>'stockage extérieur',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jardinEtPleinair->id,
        ]);

        /////////////////////////////////////////////////////////////////

        $ProduitPourBebes=Categorie::create([
            'nom'=>'produits pour bébés',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $alimentation=Categorie::create([
            'nom'=>'alimentation',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$ProduitPourBebes->id,
        ]);

        $boiteDeConservation=Categorie::create([
            'nom'=>"boite de conservation",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$alimentation->id,
        ]);

        $biberons=Categorie::create([
            'nom'=>"biberons",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$alimentation->id,
        ]);

        $nourriturePourBebes=Categorie::create([
            'nom'=>"nourriture pour bébés",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$alimentation->id,
        ]);

        //////
        $bainEtSoinDePeau=Categorie::create([
            'nom'=>'bain et soin de peau',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$ProduitPourBebes->id,
        ]);

        $baignoireEtSieges=Categorie::create([
            'nom'=>"baignoire et sièges",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        $bainMoussant=Categorie::create([
            'nom'=>"bain moussant",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        $ensemblesCadeaux=Categorie::create([
            'nom'=>"ensembles cadeaux",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        $kitDeBainDeVoyage=Categorie::create([
            'nom'=>"kit de bain de voyage",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        $setsEtTroussesDeToilette=Categorie::create([
            'nom'=>"sets et trousses de toilette",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        $shampooing=Categorie::create([
            'nom'=>"shampooing",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        $soinDeLaPeau=Categorie::create([
            'nom'=>"soin de la peau",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        $savonsEtNettoyants=Categorie::create([
            'nom'=>"savons et nettoyants",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$bainEtSoinDePeau->id,
        ]);

        //////
        $couchesBebe=Categorie::create([
            'nom'=>'couches bébé',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$ProduitPourBebes->id,
        ]);

        $sacsAlanger=Categorie::create([
            'nom'=>"sacs à langer",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$couchesBebe->id,
        ]);

        $couchesJetables=Categorie::create([
            'nom'=>"couches jetables",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$couchesBebe->id,
        ]);

        $lingettesEtAccessoires=Categorie::create([
            'nom'=>"lingettes et accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$couchesBebe->id,
        ]);

        //////
        $jouetsBebeEtToutPetits=Categorie::create([
            'nom'=>'jouets bébé et tout-petits',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$ProduitPourBebes->id,
        ]);

        $jouetsDeSiegeEtPoussetteDeVoiture=Categorie::create([
            'nom'=>"jouets de siège et poussette de voiture",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$jouetsBebeEtToutPetits->id,
        ]);

        $siegeAutoEtAccessoires=Categorie::create([
            'nom'=>"siège auto et accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$jouetsBebeEtToutPetits->id,
        ]);

        //////
        $vetementsEtAccessoires=Categorie::create([
            'nom'=>'jouets bébé et tout-petits',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$ProduitPourBebes->id,
        ]);

        $bebeFille=Categorie::create([
            'nom'=>"bébé fille",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$vetementsEtAccessoires->id,
        ]);

        $bebeGarcon=Categorie::create([
            'nom'=>"bébé garçon",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$vetementsEtAccessoires->id,
        ]);

        //////
        $chambreDeBebe=Categorie::create([
            'nom'=>'chambres bébé',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$ProduitPourBebes->id,
        ]);

        $litsEtLiterieBebe=Categorie::create([
            'nom'=>"lits et literie bébé",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$chambreDeBebe->id,
        ]);

        /////////////////////////////////////////////////////////////////

        $articleDeSport=Categorie::create([
            'nom'=>'articles de sport',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $sportEtFitness=Categorie::create([
            'nom'=>'sport et fitness',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$articleDeSport->id,
        ]);

        $accessoires=Categorie::create([
            'nom'=>"accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$sportEtFitness->id,
        ]);

        $exerciceEtRemiseEnForme=Categorie::create([
            'nom'=>"exercice et remise en forme",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$sportEtFitness->id,
        ]);

        $sportDequipe=Categorie::create([
            'nom'=>"sport d'équipe",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$sportEtFitness->id,
        ]);

        $autresSports=Categorie::create([
            'nom'=>"autres sports",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$sportEtFitness->id,
        ]);

        //////
        $aventureEnPleinAir=Categorie::create([
            'nom'=>'fonctionnement',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$articleDeSport->id,
        ]);

        $fonctionnement=Categorie::create([
            'nom'=>"fonctionnement",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$aventureEnPleinAir->id,
        ]);

        //////
        $sportDeLoisirsEtSalleDeJeux=Categorie::create([
            'nom'=>"sport de loisirs et salle de jeux",
            'niveau_id'=>$n2->id,
            'categorie_id'=>$articleDeSport->id,
        ]);

        $tennisDeTable=Categorie::create([
            'nom'=>"tennis de table",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$sportDeLoisirsEtSalleDeJeux->id,
        ]);

        /////////////////////////////////////////////////////////////////

        $jeuxVideosEtConsole=Categorie::create([
            'nom'=>'jeux vidéos et console',
            'niveau_id'=>$n1->id,
        ]);

        //////
        $playStation=Categorie::create([
            'nom'=>'play station',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jeuxVideosEtConsole->id,
        ]);

        $playStation4=Categorie::create([
            'nom'=>"play station 4",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$playStation->id,
        ]);

        $playStation3=Categorie::create([
            'nom'=>"play station 3",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$playStation->id,
        ]);

        $playStationVita=Categorie::create([
            'nom'=>"play station vita",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$playStation->id,
        ]);

        $accessoires=Categorie::create([
            'nom'=>"accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$playStation->id,
        ]);

        $jeuxPayStation=Categorie::create([
            'nom'=>"jeux play station",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$playStation->id,
        ]);

        //////
        $xbox=Categorie::create([
            'nom'=>'xbox',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jeuxVideosEtConsole->id,
        ]);

        $xboxOne=Categorie::create([
            'nom'=>"xbox one",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$xbox->id,
        ]);

        $xbox360=Categorie::create([
            'nom'=>"xbox 360",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$xbox->id,
        ]);

        $accessoires=Categorie::create([
            'nom'=>"accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$xbox->id,
        ]);

        $jeuxXboxOne=Categorie::create([
            'nom'=>"jeux xbox one",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$xbox->id,
        ]);

        //////
        $autresSystemesDeJeu=Categorie::create([
            'nom'=>'xbox',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jeuxVideosEtConsole->id,
        ]);

        //////
        $pc=Categorie::create([
            'nom'=>'PC',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jeuxVideosEtConsole->id,
        ]);

        $jeuxPC=Categorie::create([
            'nom'=>"jeux PC",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$pc->id,
        ]);

        $accessoires=Categorie::create([
            'nom'=>"accessoires",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$pc->id,
        ]);

        //////
        $nintendo=Categorie::create([
            'nom'=>'PC',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$jeuxVideosEtConsole->id,
        ]);

        $nintendoDS=Categorie::create([
            'nom'=>"nintendo DS",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$nintendo->id,
        ]);

        $nintendoDS=Categorie::create([
            'nom'=>"Wii",
            'niveau_id'=>$n3->id,
            'categorie_id'=>$nintendo->id,
        ]);

        /////////////////////////////////////////////////////////////////

        $autresCategories=Categorie::create([
            'nom'=>'Autres catégories',
            'niveau_id'=>$n1->id,
        ]);

        $supermarche=Categorie::create([
            'nom'=>'supermarché',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $voiture=Categorie::create([
            'nom'=>'voiture',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $instrumentsDeMusique=Categorie::create([
            'nom'=>'instruments de musique',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $livre=Categorie::create([
            'nom'=>'livres',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $filmsEtSeries=Categorie::create([
            'nom'=>'films et séries',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $jouetsEtJeux=Categorie::create([
            'nom'=>'jouets et jeux',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $bienEtreSexuel=Categorie::create([
            'nom'=>'bien etre sexuel',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $animalerie=Categorie::create([
            'nom'=>'animalerie',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

        $restezEnSecurite=Categorie::create([
            'nom'=>'restez en securité',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);


        $divers=Categorie::create([
            'nom'=>'divers',
            'niveau_id'=>$n2->id,
            'categorie_id'=>$autresCategories->id,
            'autres'=>true,
        ]);

    }
}
