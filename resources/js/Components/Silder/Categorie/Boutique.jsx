import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {Link} from "@inertiajs/react";
import defaultImage from "../../../../images/gros-plan-jolie-jeune-femme-afro-americaine-regardant-enthousiasme-ecran-son-ordinateur-portable_181624-43269.jpg"


function Boutique({boutiques}) {
    return (
        <div className={'grid grid-cols-1 gap-4 my-10'}>
            <div>
                <div className={'flex justify-between items-end'}>
                    <div className={'text-xl font-bold'}>
                        <div>Boutiques</div>
                    </div>
                    <Link className={'text-sm underline hover:text-green-500'}>
                        Voir les boutiques
                    </Link>
                </div>
                <div className={"bg-green-500 h-1 w-10 mt-2"}></div>
            </div>

            {
                boutiques
                &&
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={"auto"}
                    //navigation
                    className={'w-full'}
                >
                    {
                        boutiques.map((c)=>(
                            <SwiperSlide style={{ width: 'auto' }} key={c.id}>
                                <Link>
                                    <div key={c.id} className={'h-52 w-40 rounded relative bg-black'}>
                                        <div className={"absolute z-10 text-white font-bold w-full h-full flex  justify-center items-center text-xl"}>
                                            {c.nom}
                                        </div>
                                        <img src={c.image || defaultImage} alt="" className={'absolute opacity-60 w-full h-full rounded object-cover z-0'}/>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }


        </div>

    );
}

export default Boutique;
