import React from 'react';
//import {formatNumber} from "chart.js-helpers";
import {AccessTime, Favorite, FavoriteOutlined, Place, ViewList} from "@mui/icons-material";
import {router} from "@inertiajs/react";

function AnnonceCard({annonce}) {
    const showAnnonce = (id)=> {
        router.get(route('annonce.show', id))
    }
    return (
        <div onClick={()=>showAnnonce(annonce.id)} className={'cursor-pointer w-auto hover:shadow-2xl transition duration-500 bg-gray-50'}>
            <div className={'flex gap-2 items-center mb-2 p-0.5'}>
                <div className={'border border-green-500 p-0.5 rounded-full'}>
                    <img src={annonce.user.photo} alt="" className={'w-6 h-6 rounded-full'}/>
                </div>
                <div>{annonce.user.nom}</div>
            </div>
            <div className={'h-64 relative'}>
                <img src={annonce.image} alt="" className={'absolute w-full h-full object-cover z-0'}/>
            </div>
            <div className={"flex justify-between gap-2 items-end p-3 "}>
                <div className={'h-full grid gap-2'}>
                    <div className={"w-full"}>
                        {annonce.titre}
                    </div>
                    <div className={"w-full font-bold text-lg"}>
                        {annonce.prix.toLocaleString()+' '+annonce.devise}
                    </div>

                    {
                        annonce.taille &&
                        <div className={'flex space-x-2'}>
                            {
                                annonce.taille.map((t)=>(
                                    <div key={t.id} className={'border p-1'}>
                                        {t.libelle}
                                    </div>
                                ))
                            }
                        </div>
                    }

                    <div className={"w-full flex flex-wrap gap-2"}>
                        <span className={"flex gap-1 items-center"}>
                            <div><Place fontSize={"small"}/></div>
                            <div>{annonce.adresse}</div>
                        </span>

                        <span className={"flex gap-1 items-center"}>
                            <div><AccessTime fontSize={"small"}/></div>
                            <div>{annonce.date}</div>
                        </span>
                    </div>
                </div>
                <button className={"rounded-full hover:bg-green-300 hover:text-green-500 text-neutral-600  w-fit h-fit transition duration-500 p-1"}><FavoriteOutlined/></button>
            </div>


        </div>

    );
}

export default AnnonceCard;
