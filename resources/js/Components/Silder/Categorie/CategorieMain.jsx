import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import NavLink from "@/Components/NavLink.jsx";
import {router} from "@inertiajs/react";

function CategorieMain({categories,handleMouseEnter,handleMouseLeave}) {

    return (
        <div className={'p-2'}>
            {
                categories
                &&
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={"auto"}
                    className={'p-2'}
                >
                    <SwiperSlide onMouseEnter={(e)=>handleMouseEnter(e,{'id':0,'nom':'Boutique officielle'})} style={{ width: 'auto' }}>
                        <NavLink href={route('categorie.index')}>
                            Boutique officielle
                        </NavLink>
                    </SwiperSlide>
                    {
                        categories.map((c)=>(
                            <SwiperSlide onMouseEnter={(e)=>handleMouseEnter(e,c)} style={{ width: 'auto' }} key={c.id}>
                                <NavLink href={route('categorie.show',c.id)}>
                                    <span className={"first-letter:uppercase"}>{c.nom}</span>
                                </NavLink>
                            </SwiperSlide>
                        ))
                    }
                    <SwiperSlide onMouseEnter={(e)=>handleMouseEnter(e,{'id':20,'nom':'Autres'})} style={{ width: 'auto' }}>
                        <NavLink href={route('categorie.index')}>
                            Autres
                        </NavLink>
                    </SwiperSlide>
                </Swiper>
            }
        </div>
    );
}

export default CategorieMain;
