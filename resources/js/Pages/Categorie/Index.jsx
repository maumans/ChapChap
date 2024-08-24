import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Breadcrumbs, Divider, Slider} from "@mui/material";
import {Link} from "@inertiajs/react";
import {formatNumber} from "chart.js/helpers";
import {InputOutlined, Place, ViewList, Window} from "@mui/icons-material";
import Image3 from "../../../images/Welcome img 1.jpg";
import Pagination from '@mui/material/Pagination';

function Index({auth,categories}) {

    const [slide,setSlide] = useState([50,100000])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function valuetext(value) {
        return `${value} GNF`;
    }
    const [breadcrumbs,setBreadcrumbs]=useState([
        {
            id: 1,
            text: 'Informatique',
        },
        {
            id: 2,
            text: 'Ordinateur',
        },
        {
            id: 3,
            text: 'Hp elite',
        }
    ])

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
        <Authenticated user={auth.user} categories={categories}>
            <div className={"flex justify-center w-full md:mt-14 mt-24"}>
                <div className={'max-w-6xl w-full px-4'}>
                    <Breadcrumbs aria-label="breadcrumb" separator={"/"}>
                        {
                            breadcrumbs.map(({id,text,href,active,icon}) =>(
                                <Link href={route('categorie.show',id)} key={id} color={'text.primary'} underline="hover" aria-current="page">
                                    {/*{
                                    icon && icon
                                }*/}
                                    <span className={active?'text-orange-500 text-sm':'text-sm text-black'}>
                                    {text}
                                </span>
                                </Link>
                            ))
                        }
                    </Breadcrumbs>
                    <div className={'flex gap-5 mt-2'}>
                        <div className={'bg-white w-4/12 grid gap-3 p-2 h-fit'}>
                            <div className={'font-bold'}>
                                CATÉGORIE
                            </div>
                            <div>
                                Ordinateurs
                            </div>
                            <div className={'font-bold'}>
                                Ordinateurs de bureau
                            </div>
                            <div className={'ml-2'}>
                                <div>Tout en un</div>
                                <div>Mini PC</div>
                                <div>Unités centrales</div>
                            </div>
                            <Divider/>
                            <div className={'font-bold'}>
                                MARQUE
                            </div>
                            <div className={'ml-2'}>
                                <div>Generic</div>
                                <div>Hp</div>
                            </div>
                            <Divider/>
                            <div className={'font-bold'}>
                                REMISE
                            </div>
                            <div className={'ml-2'}>
                                <div>Articles en promotion seulement</div>
                            </div>
                            <Divider/>
                            <div className={'font-bold flex justify-between'}>
                                <div>
                                    PRIX(FCFA)
                                </div>
                                <button className={'text-green-500'}>
                                    OK
                                </button>
                            </div>
                            <div className={'font-bold gap-3'}>

                                <Slider
                                    value={slide}
                                    onChange={handleChange}
                                    getAriaLabel={() => 'Temperature range'}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />
                                <div className={"flex gap-2 justify-center items-center"}>
                                    <div>
                                        <input value={1000} className={"w-full"} type={'number'}/>
                                    </div>
                                    -
                                    <div>
                                        <input value={200000} className={"w-full"} type={'number'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'w-8/12 bg-white'}>
                            <div className={'flex justify-between p-2 bg-white'}>
                                <div className={'font-bold text-xl'}>
                                    Ordinateurs
                                </div>
                                <div className={'font-bold text-lg'}>
                                    Trier par:
                                </div>
                            </div>
                            <Divider/>
                            <div className={'flex justify-between p-2 bg-white'}>
                                <div className={'text-sm'}>
                                    23 résultats
                                </div>
                                <div className={'text-sm flex gap-3'}>
                                    <div><ViewList/></div>
                                    <div><Window color={'primary'}/> </div>
                                </div>
                            </div>
                            <Divider/>
                            {
                                annonces
                                &&
                                <div
                                    className={'grid gap-5 sm:grid-cols-2 md:grid-cols-3 mt-2 p-2'}
                                >
                                    {
                                        annonces?.map((a)=>(
                                            <Link href={route('annonce.index')} key={a.id}>
                                                <div className={'w-auto hover:scale-105 transition duration-500'}>
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

                            {/*<div className={"w-full flex justify-center"}>
                                <Pagination count={annonces.last_page} showFirstButton showLastButton />
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Index;
