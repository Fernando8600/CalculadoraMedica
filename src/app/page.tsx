'use client';
import React, { useState, useEffect } from 'react';
import Card from "./components/Card";
import InputVDecimal from "./components/InputVDecimal";
import Inputv3 from './components/Inputv3';
import Checkbox2 from './components/Checkbox2';
//import Checkbox from "./components/Checkbox";
//import InputValidation from "./components/InputValidation";

export default function Home() {
  const [showMissingRCVCard, setShowMissingRCVCard] = useState(false);
  const [isCheckedState, setisCheckedState] = useState(false);
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedEmbarazo, setSelectedEmbarazo] = useState('');
  const [selectedDiabetes, setSelectedDiabetes] = useState('');
  const [selectedHtension, setSelectedHtension] = useState('');
  const [validationChange, setValidationChange] = useState(0);
  const [validationChange2, setValidationChange2] = useState(0);
  const [validationChange3, setValidationChange3] = useState(0);
  const [validationChange4, setValidationChange4] = useState(0);
  const [validationChange5, setValidationChange5] = useState(0);
  const [validationChange6, setValidationChange6] = useState(0);
  const [peso, setPeso] = useState(0);
  const [talla, setTalla] = useState(0);
  const [gestacion, setGestacion] = useState(0);
  const [imc, setImc] = useState(0);

  useEffect(() => {
    // Calcula el IMC cuando cambien los valores de peso y talla
    const calcularIMC = () => {
      if (peso && talla) {
        const imcCalculado = peso / (talla * talla);
        setImc(imcCalculado);
      }
    };

    calcularIMC();
  }, [peso, talla]);

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
  };
  const handleEmbarazoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedEmbarazo(e.target.value);
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
  //502.65 x 468
  // 384 x 468
  return (
    <main className="flex min-h-screen flex-col ml-20 sm:text-3xl items-center mb-14 mt-10">
      <h1 className="  text-ternary-dark font-semibold">Calculadora de Factores de Riesgo</h1>
      <form>
        <label htmlFor="sexo" className=" mt-10 block text-sm  text-gray-900 font-medium">
          Selecciona el sexo
        </label>
        <div className="">
          <select
            id="sexo"
            name="sexo"
            className="bg-gray-100 full rounded border-0 py-0 pl-2 pr-7 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={handleSexoChange}
          >
            <option value="" >Selecciona una opción...</option>
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
                className="bg-gray-100 full rounded border-0 py-0 pl-2 pr-7 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleEmbarazoChange}
              >
                <option value="" >Selecciona una opción...</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </> : null}
            {selectedEmbarazo === "si" && selectedSex === "mujer" ? <>
              <InputVDecimal min={0} max={42} title="Semanas de Gestación" onValueChange={handleValidationChange6} disabled={false}></InputVDecimal>
            </> : null}
            <Inputv3 min={0} max={100} title="Edad (años cumplidos)" onValueChange={handleValidationChange} disabled={false} />
            {/* <InputValidation min={0} max={100} title="Edad (años cumplidos)" onValueChange={handleValidationChange} disabled={false}></InputValidation> */}
            <InputVDecimal min={0} max={200} title="Peso (kg)" onValueChange={(value) => setPeso(value)} disabled={false}></InputVDecimal>
            <InputVDecimal min={1} max={2} title="Talla (m)" onValueChange={(value) => setTalla(value)} disabled={false}></InputVDecimal>
            <label className='px-2 text-sm font-medium text-gray-900'>IMC: {imc.toFixed(2)}</label>
            <label className='px-2 text-sm font-light text-gray-900'>{imc > 0 && imc < 18.5 && "Bajo Peso"} </label>
            <label className='px-2 text-sm font-light text-gray-900'>{imc >= 18.5 && imc < 25 && "Normal"} </label>
            <label className='px-2 text-sm font-light text-gray-900'>{imc >= 25 && imc < 30 && "Sobrepeso"} </label>
            <label className='px-2 text-sm font-light text-gray-900'>{imc >= 30 && imc < 35 && "Obesidad Grado I"} </label>
            <label className='px-2 text-sm font-light text-gray-900'>{imc >= 35 && imc < 40 && "Obesidad Grado II"} </label>
            <label className='px-2 text-sm font-light text-gray-900'>{imc >= 40 && "Obesidad Grado III"} </label>
            <br />
            <br />
            {validationChange >= 30 ? <>
              <Checkbox2
                isChecked={isCheckedState}
                handleCheckboxChange={handleCheckboxChange}
                handleValidationChange4={handleValidationChange4}
              />
              <br />
              <br />
            </>
              : null}

          </div>
          <label htmlFor="diabetes" className="mt-2 block text-sm  text-gray-900 font-medium">
            ¿Tiene Diabetes Mellitus?
          </label>
          <select
            id="diabetes"
            name="diabetes"
            className="bg-gray-100 full rounded border-0 py-0 pl-2 pr-7 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={handleDiabetesChange}
          >
            <option value="" >Selecciona una opción...</option>
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
          >
            <option value="" >Selecciona una opción...</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <br></br>
          <button
            type="button"
            className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={toggleAcciones}
          >
            Acciones
          </button>

          <div className={showAcciones ? '' : 'hidden'}>
            <label htmlFor="acciones" className="md:block  text-gray-900 font-medium text-lg">
              Acciones Recomendadas
            </label>
            <div className="md:grid md:grid-cols-3 md:gap-4 ">
              {selectedSex === "hombre" && validationChange >= 50 && validationChange <= 70 && <Card accion="Antígeno Prostático cada año."></Card>}
              {selectedSex === "mujer" && validationChange >= 25 && validationChange <= 35 && <Card accion="Papanicolau cada año"></Card>}
              {selectedSex === "mujer" && validationChange >= 35 && validationChange <= 65 && <Card accion="PCR VPH cada año."></Card>}
              {selectedSex === "mujer" && validationChange >= 40 && validationChange <= 70 && <Card accion="Mastografia (sacar cita) cada año."></Card>}

              {imc >= 25 && selectedDiabetes === "no" ?
                <>
                  <Card accion="Glicemia Capilar cada año."></Card>
                </> : null
              }
              {selectedDiabetes === "si" ?
                <>
                  <Card accion="Glicemia Capilar cada 6 meses."></Card>
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
              {((validationChange6 >= 1 && validationChange6 <= 12) || (validationChange6 >= 27 && validationChange6 <= 40) && (selectedSex === "mujer")) && <>
                <Card accion="Prueba VIH y VDRL en 1er. trimestre y 3er. trimestre"></Card>
              </>}
              {validationChange6 >= 24 && validationChange6 <= 28 && selectedSex === "mujer" && <>
                <Card accion="Realizar curva de tolerancia a la Glucosa"></Card>
              </>}
              {validationChange6 > 28 && validationChange6 <= 42 && selectedSex === "mujer" && <>
                <Card accion="En caso de no tenerla, realizar curva de tolerancia a la Glucosa"></Card>
              </>}

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