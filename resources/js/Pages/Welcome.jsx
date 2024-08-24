import { Link, Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import Image1 from '../../images/couple-jeunes-femmes-africaines-recherche-endroit-pour-manger-aide-leur-smartphone-apres-shopping_181624-45893.jpg'
import Image2 from '../../images/gros-plan-jolie-jeune-femme-afro-americaine-regardant-enthousiasme-ecran-son-ordinateur-portable_181624-43269.jpg'
import Image3 from '../../images/Welcome img 1.jpg'
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import NavLink from "@/Components/NavLink.jsx";
import React, {useState} from "react";
import {formatNumber} from "chart.js/helpers";
import TopCategorie from "@/Components/Silder/Categorie/TopCategorie.jsx";
import {Place, Timer, Watch, WatchRounded} from "@mui/icons-material";
import Boutique from "@/Components/Silder/Categorie/Boutique.jsx";
export default function Welcome({ auth,categories, laravelVersion, phpVersion }) {

    const [categorie, setCategorie] = useState('Homme');
/*
    const [categories, setCategories] = useState([
        {
            'id':1,
            'nom':'Homme',
            'image':Image1
        },
        {
            'id':2,
            'nom':'Femme',
            'image':Image1
        },
        {
            'id':3,
            'nom':'Enfant',
            'image':Image1
        },
        {
            'id':4,
            'nom':'Electronique',
            'image':Image1
        },
        {
            'id':5,
            'nom':'Divertissement',
            'image':Image1
        },
        {
            'id':6,
            'nom':'Maison',
            'image':Image1
        },
    ]);
*/

    const [boutiques, setBoutiques] = useState([
        {
            'id':1,
            'nom':'Bia Shop',
            'image':Image2
        },
        {
            'id':2,
            'nom':'Marque Bankhi',
            'image':Image2
        },
        {
            'id':3,
            'nom':'Sall Corp',
            'image':Image2
        },
        {
            'id':4,
            'nom':'JPK Shop',
            'image':Image2
        },
        {
            'id':5,
            'nom':'MansShop',
            'image':Image2
        },
        {
            'id':6,
            'nom':'Anènè',
            'image':Image2
        },
    ]);
    const [annonces, setAnnonces] = useState([
        {
            'id':1,
            'titre':'Robe de luxe golden',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Conakry-Matoto',
            'date':'hier à 20:01',
        },
        {
            'id':2,
            'titre':'Femme',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':2, 'libelle':'XL'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Labé',
            'date':"aujourd'hui à 10:01",

        },
        {
            'id':3,
            'titre':'Enfant',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':2, 'libelle':'XL'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Matam',
            'date':"aujourd'hui à 09:01",
        },
        {
            'id':4,
            'titre':'Electronique',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Ratoma',
            'date':"12 Jan à 10:01",
        },
        {
            'id':5,
            'titre':'Divertissement',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':2, 'libelle':'XL'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Kankan-Dibida',
            'date':"aujourd'hui à 13:03",
        },
        {
            'id':6,
            'titre':'Maison',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':2, 'libelle':'XL'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Enta',
            'date':"aujourd'hui à 06:01",
        },

        {
            'id':7,
            'titre':'Robe de luxe golden',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':2, 'libelle':'XL'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Labé',
            'date':"aujourd'hui à 17:01",
        },
        {
            'id':8,
            'titre':'Femme',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'adresse':'Enco 5',
            'date':"13 Fev à 12:41",
        },
        {
            'id':9,
            'titre':'Enfant',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'adresse':'Labé',
            'date':"aujourd'hui à 10:01",
        },
        {
            'id':10,
            'titre':'Electronique',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':2, 'libelle':'XL'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Enco 5',
            'date':"13 Fev à 12:41",
        },
        {
            'id':11,
            'titre':'Divertissement',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'adresse':'Kipé',
            'date':"10 Mars à 10:41",
        },
        {
            'id':12,
            'titre':'Maison',
            'image':Image3,
            'prix':340000,
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'M'},
                {'id':2, 'libelle':'XL'},
                {'id':3, 'libelle':'XXL'},
            ],
            'adresse':'Enco 5',
            'date':"13 Fev à 12:41",
        },
    ]);

    return (
        <Authenticated user={auth.user} categories={categories} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accueil</h2>}>
            <div className={'w-full bg-black relative z-0'} style={{height:500}}>
                <div className={" md:text-6xl text-5xl font-bold z-10 text-white absolute top-52 lg:left-52 text-center max-w-lg"}>
                    Achetez et vendez vos produit facilement
                </div>
                <img src={Image1} alt="image accueil" className={'w-full h-full object-cover object-center absolute z-0 opacity-60'} style={{ objectPosition: '50% 15%' }}/>
            </div>

            <div className={'px-4 md:px-14 flex justify-center w-full'}>
                <div className={'w-full max-w-6xl'}>
                    <TopCategorie categories={categories}/>
                    <Boutique boutiques={boutiques}/>
                    <div className={"grid grid-cols-1 gap-4 my-20"}>

                        <div>
                            <div className={'flex justify-between items-end'}>
                                <div className={'text-xl font-bold'}>
                                    <div>A la une</div>
                                </div>
                                <Link className={'text-sm underline hover:text-green-500'}>
                                    Voir tout
                                </Link>
                            </div>
                            <div className={"bg-green-500 h-1 w-10 mt-2"}></div>
                        </div>

                        {
                            annonces
                            &&
                            <div
                                className={'w-full grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'}
                            >
                                {
                                    annonces.map((a)=>(
                                        <Link href={route('annonce.index')} key={a.id}>
                                            <div className={'w-auto'}>
                                                <div className={'flex justify-between items-end mb-2'}>
                                                    <img src={a.user.photo} alt="" className={'w-6 h-6 rounded-full'}/>
                                                    <div>{a.user.nom}</div>
                                                </div>
                                                <div className={'h-64 relative'}>
                                                    <img src={a.image} alt="" className={'absolute w-full h-full object-cover z-0'}/>
                                                </div>
                                                <div className={'bg-white p-3 h-40'}>
                                                    <div className={"w-full"}>
                                                        {a.titre}
                                                    </div>
                                                    <div className={"w-full font-bold text-lg"}>
                                                        {formatNumber(a.prix)+' '+a.devise}
                                                    </div>

                                                    {
                                                        a.taille &&
                                                        <div className={'flex space-x-2'}>
                                                            {
                                                                a.taille.map((t)=>(
                                                                    <div key={t.id} className={'border p-1'}>
                                                                        {t.libelle}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }

                                                    <div className={"w-full flex my-2 gap-1"}>
                                                        <div>
                                                            <Place/>{a.adresse}
                                                        </div>
                                                        |
                                                        <div>
                                                            {a.date}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </Link>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
