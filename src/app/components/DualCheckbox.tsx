// Checkbox.js
import InputValidation from './InputValidation';
import Inputv3 from './Inputv3';
import React, { useState } from 'react';

function DualCheckbox(props: { isCheckedRN: any; isCheckedLessThan1: any; handleDualCheckboxChange: any; }) {
    const { isCheckedRN, isCheckedLessThan1, handleDualCheckboxChange } = props;
    const handleRNCheckboxChange = () => {
        // Si se marca la casilla RN, se desmarca la casilla < 1 año si está marcada
        handleDualCheckboxChange(!isCheckedRN, isCheckedRN && isCheckedLessThan1);
    };

    const handleLessThan1CheckboxChange = () => {
        // Si se marca la casilla < 1 año, se desmarca la casilla RN si está marcada
        handleDualCheckboxChange(isCheckedLessThan1 && isCheckedRN, !isCheckedLessThan1);
    };
    return (
        <div className="flex items-center ">
            {/* Checkbox RN */}
            <div className='flex'>
                <input
                    id="checkbox-rn"
                    type="checkbox"
                    className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleRNCheckboxChange}
                    checked={isCheckedRN}
                />
                <div className="ms-2 text-sm">
                    <label htmlFor="checkbox-rn" className="font-medium text-gray-900 dark:text-gray-300">RN</label>
                </div>
            </div>

            {isCheckedRN}

            {/* Checkbox < 1 año */}
            <div className='ml-2 flex items-center h-5'>
                <input
                    id="checkbox-less-than-1"
                    type="checkbox"
                    className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleLessThan1CheckboxChange}
                    checked={isCheckedLessThan1}
                />
                <div className="ms-2 text-sm">
                    <label htmlFor="checkbox-less-than-1" className="font-medium text-gray-900 dark:text-gray-300">  &lt;1 año</label>
                </div>
            </div>

        </div>
    );
}

export default DualCheckbox;
