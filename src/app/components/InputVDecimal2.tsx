import { FloatingLabel } from 'flowbite-react';
import React, { useState, useEffect } from 'react';

interface InputVProps {
    max: number;
    min: number;
    title: string;
    onValueChange: (value: number) => void;
    value?: number;
    disabled: boolean;
}



export default function InputVDecimal2({ max, min, title, value, onValueChange, disabled }: InputVProps) {

    const handleValueChange = (newValue: string) => {
        const parsedValue = parseFloat(newValue);
        if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max) {

            onValueChange(parsedValue);
        } else if (newValue === '') {
            onValueChange(0);
        }

    };

    const [errors, setErrors] = useState<boolean>(false);

    useEffect(() => {
        validateForm();
    }, [value]);

    const validateForm = () => {
        const parsedValue = Number(value);

        if (!value) {
            setErrors(true);
        } else if (Number.isFinite(parsedValue) && parsedValue >= min && parsedValue <= max) {
            setErrors(false);
        } else {
            setErrors(true);
        }
    };


    return (
        <>
            <div className="">
                <label htmlFor={title} className="px-2 text-sm font-light text-gray-900 py-2">
                    {title}
                </label>
                {disabled ? <>
                    <br />
                    <br />
                </>
                    : null}
                <div className={disabled ? 'hidden' : "relative h-10 min-w-[100px] w-40 md:my-3 sm:my-6 xs:mb-6 xs:my-2"}>

                    <FloatingLabel variant="outlined" label={errors ? "Número No Válido" : "Número Aceptado"} color={errors ? "error" : "success"} value={disabled ? '' : value}
                        onChange={(e) => handleValueChange(e.target.value)}
                        disabled={disabled} />

                </div>
            </div>

            <link
                rel="stylesheet"
                href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
            />
        </>
    );
}

