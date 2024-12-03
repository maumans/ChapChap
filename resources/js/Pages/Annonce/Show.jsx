import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Breadcrumbs, Button, Divider} from "@mui/material";
import {Link} from "@inertiajs/react";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {formatNumber} from "chart.js/helpers";
import {Favorite, Place} from "@mui/icons-material";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

function Show({auth, categories, annonceSt}) {
    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            id: annonceSt?.categorie?.categorie?.id || 1,
            text: annonceSt?.categorie?.categorie?.nom || 'Catégorie',
            active: false
        },
        {
            id: annonceSt?.categorie?.id || 2,
            text: annonceSt?.categorie?.nom || 'Sous-catégorie',
            active: true
        }
    ]);

    const [annonce, setAnnonce] = useState(annonceSt);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (annonceSt) {
            setAnnonce(annonceSt);
        }
    }, [annonceSt]);

    return (
        <Authenticated user={auth.user} categories={categories}>
            <div className={"flex justify-center w-full md:mt-14 mt-24"}>
                <div className={'max-w-6xl w-full px-4'}>
                    <Breadcrumbs aria-label="breadcrumb" separator={"/"}>
                        {breadcrumbs.map(({id, text, active}) => (
                            <Link href={route('categorie.show', id)} key={id} color={'text.primary'} underline="hover" aria-current="page">
                                <span className={active ? 'text-green-500 text-sm' : 'text-sm text-black'}>
                                    {text}
                                </span>
                            </Link>
                        ))}
                    </Breadcrumbs>
                    <div className={"md:flex gap-5 mt-2"}>
                        <div className={'flex flex-col gap-5 md:w-8/12'}>
                            <div className={'bg-white p-2 md:flex space-x-2 space-y-2 w-full relative'}>
                                <div className={'md:w-4/12 w-full'}>
                                    <div className={'w-full h-96 overflow-hidden rounded-lg'}>
                                        <img 
                                            src={`/storage/${annonce?.images[activeImageIndex]?.url}`} 
                                            alt={annonce?.titre} 
                                            className={'h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105'}
                                        />
                                    </div>
                                    <div className={'flex justify-center mt-4'}>
                                        <Swiper
                                            modules={[Navigation]}
                                            spaceBetween={8}
                                            slidesPerView={"auto"}
                                            navigation
                                            className={'w-full max-w-xs'}
                                        >
                                            {annonce?.images?.map((image, index) => (
                                                <SwiperSlide style={{ width: 'auto' }} key={image.id}>
                                                    <button
                                                        onClick={() => setActiveImageIndex(index)}
                                                        className={`h-16 w-16 rounded-lg overflow-hidden transition-all duration-300 ${
                                                            activeImageIndex === index 
                                                                ? 'ring-2 ring-green-500 ring-offset-2' 
                                                                : 'opacity-70 hover:opacity-100'
                                                        }`}
                                                    >
                                                        <img 
                                                            src={`/storage/${image.url}`} 
                                                            alt={`${annonce?.titre} - Image ${index + 1}`}
                                                            className={'w-full h-full object-cover'}
                                                        />
                                                    </button>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                                <div className={'flex flex-col gap-2 md:w-8/12'}>
                                    <div className={"flex justify-between"}>
                                        <div className={'font-bold max-w-sm text-lg'}>
                                            {annonce?.titre}
                                        </div>
                                        <Link className={"rounded-full p-2 bg-neutral-400 w-fit h-fit z-50 hidden md:block"}>
                                            <Favorite className={"text-white"}/>
                                        </Link>
                                    </div>
                                    

                                    {annonce?.marque && (
                                        <div className={'max-w-sm flex gap-2 flex-wrap'}>
                                            <div>
                                                Marque: <Link className={'text-blue-900 hover:underline'}>{annonce.marque}</Link>
                                            </div>
                                            |
                                            <div>
                                                <Link className={"text-blue-900 hover:underline"}>
                                                    Produits similaires par {annonce.marque}
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-4">
                                        {/* Résumé des caractéristiques principales */}
                                        {annonce?.champs && (
                                            <div className="flex flex-wrap gap-2">
                                                {annonce.champs
                                                    .slice(0, 4) // Prendre les 4 premières caractéristiques
                                                    .map((champ) => (
                                                        <span key={champ.id} 
                                                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-700">
                                                            {champ.formatted_value || champ.pivot.valeur}
                                                        </span>
                                                    ))
                                                }
                                                {annonce.champs.length > 4 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        +{annonce.champs.length - 4} plus
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Prix et autres informations */}
                                        <div className="flex items-center gap-4">
                                            <div className="text-2xl font-bold text-gray-900">
                                                {formatNumber(annonce?.prix)} {annonce?.devise?.symbole}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"w-full flex my-2 gap-1"}>
                                        <div>
                                            <Place/>{annonce?.adresse}
                                        </div>
                                        |
                                        <div>
                                            {new Date(annonce?.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'bg-white divide-y'}>
                                <div className={'text-xl p-2 font-bold'}>
                                    Détails
                                </div>
                                {/* Description */}
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-600 whitespace-pre-line">{annonce?.description}</p>
                                </div>

                                {/* Caractéristiques détaillées */}
                                {annonce?.champs && annonce.champs.length > 0 && (
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Caractéristiques détaillées
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {annonce.champs.map((champ) => (
                                                <div key={champ.id} className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="text-sm text-gray-500">{champ.label}</div>
                                                    <div className="font-medium">
                                                        {champ.formatted_value || champ.pivot.valeur}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={"hidden p-2 bg-white w-4/12 md:grid gap-2 h-fit"}>
                            <div className={"border rounded-2xl p-2"}>
                                <div className={'flex justify-between items-center mb-2 border rounded-2xl p-2'}>
                                    <img 
                                        src={annonce?.annonciateur?.profile_photo_url || '/default-avatar.png'} 
                                        alt="" 
                                        className={'w-10 h-10 rounded-full'}
                                    />
                                    <div>{annonce?.annonciateur?.name}</div>
                                </div>
                                <Link className={"text-blue-900 hover:underline"}>
                                    Voir toutes ses annonces
                                </Link>
                            </div>

                            {annonce?.telephone && (
                                <Button variant={"outlined"} color={'primary'}>
                                    Voir le numéro
                                </Button>
                            )}
                            <Button variant={"outlined"} color={'secondary'}>Message</Button>
                            {annonce?.facebook && (
                                <Button variant={"outlined"} color={'info'}>Facebook</Button>
                            )}
                            {annonce?.whatsApp && (
                                <Button variant={"outlined"} color={'success'}>WhatsApp</Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={'w-full mt-10 md:hidden fixed bg-white p-2 bottom-0 h-24 grid grid-cols-2 gap-2 z-50'}>
                    {annonce?.telephone && (
                        <Button variant={"outlined"} color={'primary'}>
                            Voir le numéro
                        </Button>
                    )}
                    <Button variant={"outlined"} color={'secondary'}>Message</Button>
                    {annonce?.facebook && (
                        <Button variant={"outlined"} color={'info'}>Facebook</Button>
                    )}
                    {annonce?.whatsApp && (
                        <Button variant={"outlined"} color={'success'}>WhatsApp</Button>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}

export default Show;
