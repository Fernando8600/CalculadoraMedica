import React, { useState, useEffect } from 'react';

interface InputVProps {
    max: number;
    min: number;
    title: string;
    onValueChange: (value: number) => void;
    disabled: boolean;
}

export default function Inputv2({ max, min, title, onValueChange, disabled }: InputVProps) {
    const [value, setValue] = useState<string>('');
    const [errors, setErrors] = useState<boolean>(false);

    useEffect(() => {
        validateForm();
    }, [value]);

    const validateForm = () => {
        const parsedValue = Number(value);

        if (value.trim() === '') {
            setErrors(true);
        } else if (Number.isInteger(parsedValue) && parsedValue >= min && parsedValue <= max) {
            setErrors(false);
        } else {
            setErrors(true);
        }
    };

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        onValueChange(Number(newValue));
    };

    useEffect(() => {
        if (disabled) {
            setValue(''); // Borra el valor del input cuando se deshabilita
        }
    }, [disabled]);
    return (
        <><div className="mb-6">
            <label htmlFor={title} className="px-2 text-sm font-light text-gray-900"> {title}</label>
            <p className={errors ? "mt-2 text-sm text-red-600 dark:text-red-500" : "mt-2 text-sm text-green-600 dark:text-green-500"}>{errors ? 'Número no válido.' : 'Número Aceptado.'}</p>
            <input placeholder=" "
                value={value}
                onChange={(e) => handleValueChange(e.target.value)}
                disabled={disabled} id="success" className={errors ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"} />


        </div>
        </>
    )
}
