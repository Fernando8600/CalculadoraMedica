// Checkbox.js

import React from 'react';
import InputValidation from './InputValidation';
import Inputv3 from './Inputv3';

function Checkbox(props: { isChecked: boolean; handleCheckboxChange: any; handleValidationChange4: any; }) {
    const { isChecked, handleCheckboxChange, handleValidationChange4 } = props;

    return (
        <div className="">
            <Inputv3 max={100}
                min={0}
                title="RCV (%)"
                disabled={isChecked}

                onValueChange={handleValidationChange4} />
            <div className='flex'>
                <div className="flex items-center h-5">

                    <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                    />
                </div>
                <div className="ms-2 text-sm">

                    <label htmlFor="helper-checkbox" className="font-medium text-gray-900 dark:text-gray-300">
                        No se aplicó
                    </label>
                    <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                        Marque la casilla en caso de no tener RCV
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Checkbox;
