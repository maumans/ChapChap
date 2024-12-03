import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Breadcrumbs, Button, Divider} from "@mui/material";
import {Link} from "@inertiajs/react";
import Image1 from "../../../../images/Welcome img 1.jpg"
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import Image2
    from "../../../../images/gros-plan-jolie-jeune-femme-afro-americaine-regardant-enthousiasme-ecran-son-ordinateur-portable_181624-43269.jpg";
import {formatNumber} from "chart.js/helpers";
import Image3 from "../../../../images/Welcome img 1.jpg"
import {Favorite, Place} from "@mui/icons-material";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

function Index({auth,categories}) {

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
            text: 'Asus',
        }
    ])

    const [annonce, setAnnonce] = useState(
        {
            'titre':'Asus Core i9 1000TB SSD 2TB HDD 16 GB RAM Nvidia Gtx 1080',
            'prix':250000,
            'images':[
                {id:1,image:Image1},
                {id:2,image:Image1},
                {id:3,image:Image1},
                {id:4,image:Image1},
            ],
            'description':'HTML element is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g. styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).',
            'devise':'GNF',
            'user':{
                'nom':'Alpha520',
                'photo':Image3,
            },
            'taille':[
                {'id':1, 'libelle':'1T SSD'},
                {'id':2, 'libelle':'2T HDD'},
                {'id':3, 'libelle':'16GB RAM'},
                {'id':4, 'libelle':'Intel core i9'},
            ],
            'marque':'Adidas',
            'adresse':'Conakry-Matoto',
            'date':'hier à 20:01',
        }
    )

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
                                    <span className={active?'text-green-500 text-sm':'text-sm text-black'}>
                                    {text}
                                </span>
                                </Link>
                            ))
                        }
                    </Breadcrumbs>
                    <div className={"md:flex gap-5 mt-2"}>
                        <div className={'flex flex-col gap-5 md:w-8/12'}>
                            <div className={'bg-white p-2 md:flex space-x-2 space-y-2 w-full relative'}>
                                <div className={'md:w-4/12 w-full'}>
                                    <div className={'w-full h-96'}>
                                        <img src={Image1} alt="" className={'h-full w-full object-cover'}/>
                                    </div>
                                    <div className={'flex justify-center'}>
                                        <Swiper
                                            modules={[Navigation]}
                                            spaceBetween={10}
                                            slidesPerView={"auto"}
                                            navigation
                                            className={'mt-2 w-44'}
                                        >
                                            {
                                                annonce.images.map((i)=>(
                                                    <SwiperSlide style={{ width: 'auto' }} key={i.id}>
                                                        <Link>
                                                            <div key={i.id} className={'h-10 w-10 rounded relative bg-black'}>
                                                                <img src={i.image} alt="" className={'absolute opacity-60 w-full h-full rounded object-cover z-0'}/>
                                                            </div>
                                                        </Link>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                </div>
                                <div className={'flex flex-col gap-2 md:w-8/12'}>

                                    <div className={"flex justify-between"}>
                                        <div className={'font-bold max-w-sm text-lg'}>
                                            {annonce.titre}
                                        </div>
                                        <Link className={"rounded-full p-2 bg-neutral-400 w-fit h-fit z-50 hidden md:block"}>
                                            <Favorite className={"text-white"}/>
                                        </Link>
                                    </div>

                                    {
                                        annonce.marque &&
                                        <div className={'max-w-sm flex gap-2 flex-wrap'}>
                                            <div>
                                                Marque: <Link className={'text-blue-900 hover:underline'}>{annonce.marque}</Link>
                                            </div>
                                            |
                                            <div>
                                                <Link className={"text-blue-900 hover:underline"}>Produit similaires par {annonce.marque}</Link>
                                            </div>
                                        </div>
                                    }

                                    <div className={'font-bold max-w-sm text-xl p-1 bg-green-500 text-white rounded w-fit'}>
                                        {formatNumber(annonce.prix)+' '+annonce.devise}
                                    </div>
                                    {
                                        annonce.taille &&
                                        <div className={'flex gap-2 flex-wrap'}>
                                            {
                                                annonce.taille.map((t)=>(
                                                    <span key={t.id} className={'border p-1'}>
                                                    {t.libelle}
                                                </span>
                                                ))
                                            }
                                        </div>
                                    }

                                    <div className={"w-full flex my-2 gap-1"}>
                                        <div>
                                            <Place/>{annonce.adresse}
                                        </div>
                                        |
                                        <div>
                                            {annonce.date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'bg-white divide-y'}>
                                <div className={'text-xl p-2 font-bold'}>
                                    Détails
                                </div>
                                <div className={"p-2"}>
                                    {annonce.description}
                                </div>
                            </div>
                        </div>
                        <div className={"hidden p-2 bg-white w-4/12 md:grid gap-2 h-fit"}>
                            <div className={"border rounded-2xl p-2"}>
                                <div className={'flex justify-between items-center mb-2 border rounded-2xl p-2'}>
                                    <img src={annonce.user.photo} alt="" className={'w-10 h-10 rounded-full'}/>
                                    <div>{annonce.user.nom}</div>
                                </div>
                                <Link className={"text-blue-900 hover:underline"}>
                                    3 annonces
                                </Link>
                            </div>

                            <Button Button variant={"outlined"} color={'primary'}>Voir le numéro</Button>
                            <Button variant={"outlined"} color={'secondary'}>Message</Button>
                            <Button variant={"outlined"} color={'info'}>Facebook</Button>
                            <Button variant={"outlined"} color={'success'}>WhatsApp</Button>
                        </div>
                    </div>

                </div>
                <div className={'w-full mt-10 md:hidden fixed bg-white p-2 bottom-0 h-24 grid grid-cols-2 gap-2 z-50'}>
                    <Button Button variant={"outlined"} color={'primary'}>Voir le numéro</Button>
                    <Button variant={"outlined"} color={'secondary'}>Message</Button>
                    <Button variant={"outlined"} color={'info'}>Facebook</Button>
                    <Button variant={"outlined"} color={'success'}>WhatsApp</Button>
                </div>
            </div>
        </Authenticated>
    );
}

export default Index;
