import React from 'react';

function Footer(props) {
    return (
        <div className={"flex flex-col items-center justify-end bg-neutral-800 h-32 mt-10"}>
            <div className={'text-green-500 font-bold text-xl'}>
                ChapChap
            </div>
            <div className={'text-white'}>
                Copyright © 2024 Mans corp. Tous droits réservés.
            </div>
        </div>
    );
}

export default Footer;
