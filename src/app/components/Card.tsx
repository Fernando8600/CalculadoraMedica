import React from 'react';

interface CardProps {
    accion: string;
}

const Card = ({ accion }: CardProps) => {
    return (
        <div className="relative mt-3 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md w-48">
            <div className="p-1">
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased align-bottom text-center ">
                    {accion}
                </p>
            </div>
        </div>
    );
};

export default Card;