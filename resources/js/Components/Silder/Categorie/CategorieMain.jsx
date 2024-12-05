import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import NavLink from "@/Components/NavLink.jsx";
import {router} from "@inertiajs/react";

function CategorieMain({categories, handleMouseEnter, handleMouseLeave, hoveredItem, isHovering}) {
    return (
        <div className={'p-2'}>
            {categories && (
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={"auto"}
                    className={'p-2'}
                >
                    <SwiperSlide 
                        onMouseEnter={(e) => handleMouseEnter(e, {'id': 0, 'nom': 'Boutique officielle'})}
                        onMouseLeave={handleMouseLeave}
                        style={{ width: 'auto' }}
                    >
                        <NavLink 
                            href={route('categorie.index')}
                            className={`category-item ${hoveredItem?.id === 0 && isHovering ? 'hovering' : ''}`}
                        >
                            Boutique officielle
                        </NavLink>
                    </SwiperSlide>
                    {categories.map((c) => (
                        <SwiperSlide 
                            onMouseEnter={(e) => handleMouseEnter(e, c)}
                            onMouseLeave={handleMouseLeave}
                            style={{ width: 'auto' }} 
                            key={c.id}
                        >
                            <NavLink 
                                href={route('categorie.show', c.id)}
                                className={`category-item ${hoveredItem?.id === c.id && isHovering ? 'hovering' : ''}`}
                            >
                                <span className={"first-letter:uppercase"}>{c.nom}</span>
                            </NavLink>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide 
                        onMouseEnter={(e) => handleMouseEnter(e, {'id': 20, 'nom': 'Autres'})}
                        onMouseLeave={handleMouseLeave}
                        style={{ width: 'auto' }}
                    >
                        <NavLink 
                            href={route('categorie.index')}
                            className={`category-item ${hoveredItem?.id === 20 && isHovering ? 'hovering' : ''}`}
                        >
                            Autres
                        </NavLink>
                    </SwiperSlide>
                </Swiper>
            )}
        </div>
    );
}

export default CategorieMain;
