// Checkbox.js

import React from 'react';

import InputVDecimalOriginal from './InputDecimalOriginal';
import InputVDecimal2 from './InputVDecimal2';

function Checkbox(props: { isChecked: boolean; handleCheckboxChange: any; handleValidationChange4: any; validationChange4: any; }) {
    const { isChecked, handleCheckboxChange, handleValidationChange4, validationChange4 } = props;

    return (
        <div className="">

            {isChecked ? '' : <InputVDecimal2 max={100}
                min={0}
                title="RCV a 10 años (%)"
                disabled={isChecked}
                onValueChange={handleValidationChange4}
                value={validationChange4} />
            }
            <a href="https://www.msdmanuals.com/medical-calculators/ACCAHA2013-es.htm" target="_blank" rel="noopener noreferrer">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Calcular RCV
                </button>
            </a>
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
