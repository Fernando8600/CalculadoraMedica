import React from 'react';

interface CardProps2 {
    accion: string;
}

const Card2 = ({ accion }: CardProps2) => {
    return (
        <div className="relative mt-3 flex flex-col rounded-xl bg-red-700  bg-clip-border text-white shadow-md w-48">
            <div className="p-1">
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased align-bottom text-center ">
                    {accion}
                </p>
            </div>
        </div>
    );
};

export default Card2;