'use client';
import React, { useState, useEffect } from 'react';
import Card from "./components/Card";
import InputVDecimal from "./components/InputVDecimal";
import Inputv3 from './components/Inputv3';
import Checkbox2 from './components/Checkbox2';
import DualCheckbox from './components/DualCheckbox';
import InputVDecimal2 from './components/InputVDecimal2';
import Card2 from './components/Card2';
import InputVDecimalOriginal from './components/InputDecimalOriginal';
//import Checkbox from "./components/Checkbox";
//import InputValidation from "./components/InputValidation";

export default function Home() {
  const [showMissingRCVCard, setShowMissingRCVCard] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [isCheckedState, setisCheckedState] = useState(false);
  const [isCheckedRN, setisCheckedRN] = useState(false);
  const [isCheckedLessThan1, setisCheckedLessThan1] = useState(false);
  const [showAgeInput, setShowAgeInput] = useState(true);
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedEmbarazo, setSelectedEmbarazo] = useState('selec');
  const [selectedDiabetes, setSelectedDiabetes] = useState('selec');
  const [selectedHtension, setSelectedHtension] = useState('selec');
  const [validationChange, setValidationChange] = useState(0);
  const [validationChange2, setValidationChange2] = useState(0);
  const [validationChange3, setValidationChange3] = useState(0);
  const [validationChange4, setValidationChange4] = useState(0);
  const [validationChange5, setValidationChange5] = useState(0);
  const [validationChange6, setValidationChange6] = useState(0);
  const [validationChangeRN, setValidationChangeRN] = useState(0);
  const [validationChangeL1, setValidationChangeL1] = useState(0);
  const [peso, setPeso] = useState(0);
  const [talla, setTalla] = useState(0);
  const [gestacion, setGestacion] = useState(0);
  const [imc, setImc] = useState(0);
  const [dualCheckboxEnabled, setDualCheckboxEnabled] = useState(true); // Estado para habilitar/deshabilitar los DualCheckbox

  function resetForm() {
    setSelectedEmbarazo('selec');
    setSelectedDiabetes('selec');
    setSelectedHtension('selec');
    setSelectedSex('selec');

    setValidationChangeL1(0);
    setValidationChangeRN(0);
    setValidationChange(0);
    setValidationChange3(0);
    setValidationChange6(0);
    setPeso(0);
    setTalla(0);
    setImc(0);
    setisCheckedRN(false);
    setisCheckedLessThan1(false);
    setShowAgeInput(true);

  }


  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  useEffect(() => {
    const checkAllQuestionsAnswered = () => {

      let isOptionSelected = selectedSex !== 'selec' && selectedDiabetes !== 'selec' && selectedHtension !== 'selec';

      if (selectedSex === 'mujer') {
        isOptionSelected = isOptionSelected && selectedEmbarazo !== 'selec';
      }

      let areInputsFilled = peso !== 0 && peso !== null && talla !== 0 && talla !== null;

      if (selectedEmbarazo === 'si') {
        areInputsFilled = areInputsFilled && validationChange6 !== null;
      }
      if (showAgeInput) {
        areInputsFilled = areInputsFilled && validationChange != null && validationChange != 0;
      }
      if (isCheckedRN) {
        areInputsFilled = areInputsFilled && validationChangeRN != null && validationChangeRN != 0;
      }

      if (isCheckedLessThan1) {
        areInputsFilled = areInputsFilled && validationChangeL1 != null && validationChangeL1 != 0;
      }
      if (showAgeInput && validationChange >= 30) {
        areInputsFilled = areInputsFilled && (validationChange4 != null || isCheckedState == true);
      }
      // Actualizar 
      setAllQuestionsAnswered(isOptionSelected && areInputsFilled);
    };

    checkAllQuestionsAnswered();
  }, [selectedSex, selectedEmbarazo, selectedDiabetes, selectedHtension, validationChange, validationChange4, validationChange6, peso, talla, validationChangeL1, validationChangeRN, isCheckedState]);
  useEffect(() => {
    if (!allQuestionsAnswered) {
      setShowAcciones(false);
    }
  }, [allQuestionsAnswered]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sexop = urlParams.get('sexop');
    const aniosp = parseInt(urlParams.get('aniosp') || '0');
    const mesesp = parseInt(urlParams.get('mesesp') || '0'); // Si es null, establece el valor en '0'
    const diasp = parseInt(urlParams.get('diasp') || '0'); // Si es null, establece el valor en '0'
    const tallap = parseFloat(urlParams.get('tallap') || '0'); // Si es null, establece el valor en '0'
    const pesop = parseFloat(urlParams.get('pesop') || '0'); // Si es null, establece el valor en '0'
    const imcp = parseFloat(urlParams.get('imcp') || '0'); // Si es null, establece el valor en '0'


    if (sexop === '1') {
      setSelectedSex('hombre')
    } else if (sexop === '2') {
      setSelectedSex('mujer')
    } else {
      setSelectedSex('selec')
    }


    if (aniosp === 0 && mesesp !== 0) {
      setShowAgeInput(false);
      setValidationChangeL1(mesesp);
    } else if (aniosp === 0 && mesesp === 0 && diasp !== 0) {
      setShowAgeInput(false);
      setValidationChangeRN(diasp);
    } else {
      setValidationChange(aniosp);
      setShowAgeInput(true);
    }
    setTalla(tallap);
    setPeso(pesop);

    setImc(imcp);

    const sexoInput = document.getElementById('sexo') as HTMLSelectElement | null;
    if (sexoInput) sexoInput.value = sexop || '';

    const embarazoInput = document.getElementById('embarazo') as HTMLSelectElement | null;
    if (embarazoInput) embarazoInput.value = urlParams.get('embarazo') || '';

    const tallaInput = document.getElementById('tallap') as HTMLInputElement | null;
    if (tallaInput) tallaInput.value = tallap.toString();

    const pesoInput = document.getElementById('pesop') as HTMLInputElement | null;
    if (pesoInput) pesoInput.value = pesop.toString();
  }, []);






  useEffect(() => {
    const calcularIMC = () => {
      if (peso && talla) {
        const imcCalculado = peso / ((talla / 100) * (talla / 100));
        setImc(imcCalculado);
      }
    };

    calcularIMC();
  }, [peso, talla]);

  const handleDualCheckboxChange = (isCheckedRN: boolean | ((prevState: boolean) => boolean), isCheckedLessThan1: boolean | ((prevState: boolean) => boolean)) => {
    if (isCheckedRN || isCheckedLessThan1) {
      setShowAgeInput(false);
      setValidationChange(0);
      setValidationChange4(0);
      setValidationChange6(0);

    } else if (!isCheckedRN && !isCheckedLessThan1) {
      setShowAgeInput(true);
    }
    setisCheckedRN(isCheckedRN);
    setisCheckedLessThan1(isCheckedLessThan1);
    if (isCheckedRN || !isCheckedLessThan1) {
      setValidationChangeL1(0);
    }
    if (isCheckedLessThan1 || !isCheckedRN) {
      setValidationChangeRN(0);
    }
  };


  const handleCheckboxChange = () => {
    setisCheckedState(!isCheckedState);
    if (!isCheckedState) {
      setValidationChange4(0);
      setShowMissingRCVCard(true);
    } else {
      setShowMissingRCVCard(false);
    }


  };
  const [showAcciones, setShowAcciones] = useState(false);
  const toggleAcciones = () => {
    setShowAcciones(!showAcciones);
  };
  const handleSexoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedSex(e.target.value);
    if (e.target.value === 'hombre' && !dualCheckboxEnabled) {
      setDualCheckboxEnabled(true);
    }
  };
  const handleEmbarazoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedEmbarazo(e.target.value);
    // Si la opción "Embarazo" es "Sí", deshabilitar los DualCheckbox
    if (e.target.value === 'si') {
      setDualCheckboxEnabled(false);
      setisCheckedLessThan1(false);
      setisCheckedRN(false);
      setShowAgeInput(true);
    } else {
      setDualCheckboxEnabled(true);
    }
  };
  const handleDiabetesChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedDiabetes(e.target.value);
  };
  const handleHtensionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedHtension(e.target.value);
  };
  const handleValidationChange = (value: React.SetStateAction<number>) => {
    setValidationChange(value);
  };
  const handleValidationChange2 = (value: React.SetStateAction<number>) => {
    setValidationChange2(value);
  };
  const handleValidationChange3 = (value: React.SetStateAction<number>) => {
    setValidationChange3(value);
  };
  const handleValidationChange4 = (value: React.SetStateAction<number>) => {
    setValidationChange4(value);
  };
  const handleValidationChange5 = (value: React.SetStateAction<number>) => {
    setValidationChange5(value);
  };
  const handleValidationChange6 = (value: React.SetStateAction<number>) => {
    setValidationChange6(value);
  };
  const handleValidationChangeRN = (value: React.SetStateAction<number>) => {
    setValidationChangeRN(value);
  };
  const handleValidationChangeL1 = (value: React.SetStateAction<number>) => {
    setValidationChangeL1(value);
  };

  //502.65 x 468
  // 384 x 468
  return (
    <main className="flex min-h-screen flex-col sm:text-3xl items-center mb-14 mt-10">
      <h1 className="  text-ternary-dark font-semibold">Calculadora de Acciones Preventivas</h1>
      <form>
        <label htmlFor="sexo" className=" mt-10 block text-sm  text-gray-900 font-medium">
          Selecciona el sexo
        </label>
        <div className="">
          <select
            id="sexo"
            name="sexo"
            className=" sm:mb-6 bg-gray-100 full rounded border-0 py-0 pl-2 pr-7 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={handleSexoChange}
            value={selectedSex}
          >
            <option value="selec" >Selecciona una opción...</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>



          <div className="md:columns-2 sm:columns-1">

            {selectedSex === "mujer" ? <>
              <label htmlFor="embarazo" className=" block text-sm  text-gray-900 font-medium">
                ¿Está embarazada?
              </label>
              <select
                id="embarazo"
                name="embarazo"
                className=" xs:mb-4 sm:mb-3 bg-gray-100 full rounded border-0 py-0 pl-2 pr-7 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleEmbarazoChange}
              >
                <option value="selec" >Selecciona una opción...</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </> : null}
            {selectedEmbarazo === "si" && selectedSex === "mujer" ? <>
              <InputVDecimal value={validationChange6} min={0} max={42} title="Semanas de Gestación" onValueChange={handleValidationChange6} disabled={false}></InputVDecimal>
            </> : null}

            <div className='flex'>
              {showAgeInput && <Inputv3 value={validationChange} min={1} max={100} title="Edad (años cumplidos)" onValueChange={handleValidationChange} disabled={false} />}
              {isCheckedRN == true ? <><div className='mr-2'>
                <Inputv3 value={validationChangeRN} min={0} max={31} title="Edad (dias cumplidos)" onValueChange={handleValidationChangeRN} disabled={false} />
              </div>
              </>
                : null}
              {isCheckedLessThan1 && <Inputv3 value={validationChangeL1} min={0} max={12} title="Edad (meses cumplidos)" onValueChange={handleValidationChangeL1} disabled={false} />}


              {dualCheckboxEnabled && (
                <>
                  <DualCheckbox
                    isCheckedRN={isCheckedRN}
                    isCheckedLessThan1={isCheckedLessThan1}
                    handleDualCheckboxChange={handleDualCheckboxChange}
                  />
                </>
              )}
            </div>

            <div className='break-after-column'>
              <InputVDecimal2 value={peso} min={0} max={200} title="Peso (kg)" onValueChange={(value) => setPeso(value)} disabled={false}></InputVDecimal2>
            </div>

            <InputVDecimal value={talla} min={1} max={200} title="Talla (cm)" onValueChange={(value) => setTalla(value)} disabled={false}></InputVDecimal>
            {imc <= 60 && <label className='px-1 text-sm font-medium text-gray-900'>IMC: {imc.toFixed(2)}</label>}
            <div className='flex-1 mb-2'>
              <label className='text-sm font-medium text-gray-900'>{imc > 0 && imc < 18.5 && "Peso Bajo"} </label>
              <label className='text-sm font-medium text-gray-900'>{imc >= 18.5 && imc < 25 && "Peso saludable"} </label>
              <label className='text-sm font-medium text-gray-900'>{imc >= 25 && imc < 30 && "Sobrepeso"} </label>
              <label className='text-sm font-medium text-gray-900'>{imc >= 30 && imc < 35 && "Obesidad Grado I"} </label>
              <label className='text-sm font-medium text-gray-900'>{imc >= 35 && imc < 40 && "Obesidad Grado II"} </label>
              <label className='text-sm font-medium text-gray-900'>{imc >= 40 && imc <= 60 && "Obesidad Grado III"} </label>
            </div>
            {validationChange >= 30 ? <>
              <Checkbox2
                isChecked={isCheckedState}
                handleCheckboxChange={handleCheckboxChange}
                handleValidationChange4={handleValidationChange4}
              />

            </>
              : null}
            {selectedEmbarazo !== "si" ? <>
              <br />
              <br></br>
            </>
              : null}

          </div>
          <label htmlFor="diabetes" className="md:mt-2 block text-sm  text-gray-900 font-medium">
            ¿Tiene Diabetes Mellitus?
          </label>
          <select
            id="diabetes"
            name="diabetes"
            className="bg-gray-100 full rounded border-0 py-0 pl-2 pr-7 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={handleDiabetesChange}
            value={selectedDiabetes}
          >
            <option value="selec" >Selecciona una opción...</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <br />
          <label htmlFor="hipertension" className="mt-2 block text-sm  text-gray-900 font-medium">
            ¿Tiene Hipertensión?
          </label>
          <select
            id="htension"
            name="htension"
            className="bg-gray-100 full rounded border-0 py-0 pl-2 pr-7 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={handleHtensionChange}
            value={selectedHtension}
          >
            <option value="selec" >Selecciona una opción...</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <br></br>

          <button
            type="button"
            className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {

              if (allQuestionsAnswered) {
                setShowAlertMessage(false);
                toggleAcciones();
              } else if (!allQuestionsAnswered) {
                setShowAlertMessage(true);
              }
            }}
          >
            Mostrar Acciones
          </button>
          <button
            type="button"
            className="mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={resetForm}
          >
            Rehacer
          </button>
          {showAlertMessage && <label htmlFor="alert" className="md:block  text-red-600 font-medium text-lg">
            Algunos campos no han sido llenados, completelos e intente de nuevo.
          </label>}
          <div className={showAcciones ? '' : 'hidden'}>
            <label htmlFor="acciones" className="md:block  text-gray-900 font-medium text-lg">
              Acciones Recomendadas:
            </label>
            <div className="md:grid md:grid-cols-3 md:gap-4 ">
              {selectedSex === "hombre" && validationChange >= 50 && validationChange <= 70 && <Card accion="Antígeno Prostático cada año."></Card>}
              {selectedSex === "mujer" && validationChange >= 25 && validationChange <= 35 && <Card accion="Papanicolau cada año."></Card>}
              {selectedSex === "mujer" && validationChange >= 35 && validationChange <= 65 && <Card accion="PCR VPH cada año."></Card>}
              {selectedSex === "mujer" && validationChange >= 40 && validationChange <= 70 && <Card accion="Mastografia (sacar cita) cada año."></Card>}
              {((validationChange >= 1 && validationChange <= 6) || isCheckedRN || isCheckedLessThan1 && selectedEmbarazo != "si") && <Card accion="Esquema de Vacunación completo para la edad"></Card>}
              {validationChangeRN >= 3 && isCheckedRN && validationChangeRN <= 7 && selectedEmbarazo != "si" && <Card accion="Tamiz metabólico"></Card>}

              {imc >= 25 && (selectedDiabetes === "no" || selectedDiabetes === "selec") ?
                <>
                  <Card accion="Glicemia Capilar cada año."></Card>
                </> : null
              }
              {selectedDiabetes === "si" ?
                <>
                  <Card accion="Glicemia Capilar cada mes."></Card>
                </> : null
              }
              {/* hipertension */}
              {selectedDiabetes === "si" || selectedHtension == "si" ?
                <>
                  <Card accion="Química Sanguínea de 4e. cada año."></Card>
                </> : null
              }
              {selectedDiabetes === "si" &&
                <>
                  <Card accion="HbA1C cada 6 meses."></Card>
                  <Card accion="Microalbuminuria cada año."></Card>
                </>
              }
              {validationChange4 >= 5 && validationChange4 <= 19.9 && <><Card accion="Evaluar Colesterol y otros factores de riesgo cada año."></Card><Card accion="Electrocardiograma cada año."></Card>
              </>}
              {validationChange4 >= 20 && <>
                <Card accion="Estatina y/o aspirina sugerida al año."></Card>
                <Card accion="Electrocardiograma cada año."></Card>
              </>}
              {((validationChange6 >= 1 && validationChange6 <= 12 && selectedEmbarazo == "si") || (validationChange6 >= 27 && validationChange6 <= 40) && (selectedSex === "mujer" && selectedEmbarazo === "si" && validationChange > 11)) && <>
                <Card accion="Prueba VIH y VDRL en 1er. trimestre y 3er. trimestre."></Card>
              </>}
              {validationChange6 >= 24 && validationChange6 <= 28 && selectedSex === "mujer" && selectedEmbarazo == "si" && validationChange > 11 && <>
                <Card accion="Realizar curva de tolerancia a la Glucosa."></Card>
              </>}
              {validationChange6 > 28 && validationChange6 <= 42 && selectedSex === "mujer" && selectedEmbarazo == "si" && validationChange > 11 && <>
                <Card accion="En caso de no tenerla, realizar curva de tolerancia a la Glucosa."></Card>
              </>}
              {validationChange6 >= 11 && validationChange6 <= 14 && selectedSex === "mujer" && selectedEmbarazo == "si" && validationChange > 11 && <>
                <Card accion="USG tamiz malformaciones cromosómicas"></Card>
              </>}
              {validationChange6 >= 15 && validationChange6 <= 24 && selectedSex === "mujer" && selectedEmbarazo == "si" && validationChange > 11 && <>
                <Card accion="USG estructural"></Card>
              </>}
              {validationChange6 >= 28 && validationChange6 <= 36 && selectedSex === "mujer" && selectedEmbarazo == "si" && validationChange > 11 && <>
                <Card accion="USG 3er trimestre"></Card>
              </>}
              {selectedEmbarazo === "si" && validationChange > 11 && selectedSex === "mujer" ?
                <>
                  <Card accion="Urobililabstix."></Card>
                </> : null
              }
              {showMissingRCVCard && (
                <Card accion="Tomar RCV."></Card>
              )}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}