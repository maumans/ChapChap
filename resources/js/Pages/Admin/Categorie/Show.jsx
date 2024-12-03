import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Breadcrumbs, Button, Divider, FormControl, InputLabel, MenuItem, Select, Slider} from "@mui/material";
import {Link, useForm} from "@inertiajs/react";
import {formatNumber} from "chart.js/helpers";
import {Filter, FilterList, InputOutlined, Place, ViewList, Window} from "@mui/icons-material";
import Image3 from "../../../../images/Welcome img 1.jpg";
import Pagination from '@mui/material/Pagination';
import AnnonceCard from "@/Components/Display/AnnonceCard.jsx";
import AnnonceRow from "@/Components/Display/AnnonceRow.jsx";

function Show({auth,categories,parents,categorie}) {
    const { data, setData } = useForm({
        tri: "les plus demandés",
    })

    const [list,setList] = useState(false)
    const [slide,setSlide] = useState([50,100000])

    const handleChange = (event, newValue) => {
        setData(event.target.name, event.target.value)
    };

    function valuetext(value) {
        return `${value} GNF`;
    }
    const [breadcrumbs,setBreadcrumbs]=useState([
        ...parents?.reverse(),categorie
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
                            breadcrumbs.map(({id,nom,href,active,icon}) =>(
                                <Link href={route('categorie.show',id)} key={id} color={'text.primary'} underline="hover" aria-current="page">
                                    {/*{
                                    icon && icon
                                }*/}
                                    <div className={categorie.id===id?'text-green-500 text-sm first-letter:uppercase':'text-sm text-black first-letter:uppercase'}>
                                        {nom}
                                    </div>
                                </Link>
                            ))
                        }
                    </Breadcrumbs>
                    <div className={'flex gap-5 mt-2'}>
                        <div className={'bg-white md:w-4/12 md:grid hidden gap-3 p-2 h-fit'}>
                            <div className={'font-bold'}>
                                CATÉGORIE
                            </div>
                            <div className={'first-letter:uppercase'}>

                                {breadcrumbs.map(c=>(
                                    <Link key={c.id} href={route('categorie.show',c.id)}>
                                        <div className={c.id===categorie.id?'font-bold first-letter:uppercase ml-2':'first-letter:uppercase'} key={c.id}>{c.nom}</div>
                                    </Link>
                                ))}
                            </div>
                            <div className={'ml-4'}>
                                {
                                    !categorie?.categories
                                    ?
                                    categorie?.categorie?.categories.map(c=>(
                                        <Link key={c.id} href={route('categorie.show',c.id)}>
                                            <div className={c.id===categorie.id?'font-bold first-letter:uppercase':'first-letter:uppercase'} key={c.id}>{c.nom}</div>
                                        </Link>
                                    ))
                                    :
                                    categorie?.categories.map(c=>(
                                        <Link key={c.id} href={route('categorie.show',c.id)}>
                                            <div className={c.id===categorie.id?'font-bold first-letter:uppercase':'first-letter:uppercase'} key={c.id}>{c.nom}</div>
                                        </Link>
                                    ))
                                }
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
                                    PRIX(GNF)
                                </div>
                                <button className={'text-green-500'}>
                                    OK
                                </button>
                            </div>
                            <div className={'font-bold gap-3'}>

                                <Slider
                                    value={slide}
                                    //onChange={handleChange}
                                    getAriaLabel={() => 'Temperature range'}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />
                                {/*<div className={"flex gap-2 justify-center items-center"}>
                                    <div>
                                        <input value={1000} className={"w-full"} type={'number'}/>
                                    </div>
                                    -
                                    <div>
                                        <input value={200000} className={"w-full"} type={'number'}/>
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                        <div className={'md:w-8/12 w-full bg-white relative'}>
                            <div className={'flex justify-between items-center gap-5 p-2 bg-white'}>
                                <div className={'font-bold text-xl max-w-sm first-letter:uppercase'}>
                                    {categorie.nom}
                                </div>
                                <div className={'w-full max-w-52'}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-select-small-label">Trier par:</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={data.tri}
                                            label="Trier par"
                                            onChange={handleChange}
                                            name="tri"
                                        >
                                            <MenuItem value={'les plus demandés'}>Les plus démandés</MenuItem>
                                            <MenuItem value={"récent"}>Récent</MenuItem>
                                            <MenuItem value={'prix croissant'}>Prix croissant</MenuItem>
                                            <MenuItem value={"prix décroissant"}>Prix décroissant</MenuItem>
                                            <MenuItem value={"les mieux notés"}>Les mieux notés</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <Divider/>
                            <div className={'flex justify-between p-2 bg-white'}>
                                <div className={'text-sm'}>
                                    23 résultats
                                </div>
                                <div className={'text-sm flex gap-3'}>
                                    <button onClick={()=>setList(true)}><ViewList color={list?'primary':''}/></button>
                                    <button onClick={()=>setList(false)}><Window color={!list?'primary':''}/> </button>
                                </div>
                            </div>
                            <Divider/>
                            {
                                annonces
                                &&
                                <div
                                    className={`grid gap-5 ${!list && "sm:grid-cols-2 xl:grid-cols-3"} mt-2 p-2`}
                                >
                                    {
                                        annonces?.map((a)=>(
                                            list ?
                                            <AnnonceRow key={a.id} annonce={a}/>
                                            :
                                            <AnnonceCard key={a.id} annonce={a}/>
                                        ))
                                    }
                                </div>
                            }

                            {/*<div className={"w-full flex justify-center"}>
                                <Pagination count={annonces.last_page} showFirstButton showLastButton />
                            </div>*/}
                            <div className={'w-full flex justify-center mt-10 md:hidden sticky bg-white p-2 bottom-0 gap-2 z-50'}>
                                <div className={"flex gap-2 bg-green-50 p-2 rounded border border-green-500"}>
                                    <div>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-select-small-label">Trier par:</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={data.tri}
                                                label="Trier par"
                                                onChange={handleChange}
                                                name="tri"
                                            >
                                                <MenuItem value={'les plus demandés'}>Les plus démandés</MenuItem>
                                                <MenuItem value={"récent"}>Récent</MenuItem>
                                                <MenuItem value={'prix croissant'}>Prix croissant</MenuItem>
                                                <MenuItem value={"prix décroissant"}>Prix décroissant</MenuItem>
                                                <MenuItem value={"les mieux notés"}>Les mieux notés</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <Button variant={"outlined"} color={'success'}><FilterList/></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Show;
