import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../Helper";
import PropTypes from 'prop-types';


const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #aaaaaa;
  -webkit-appearance: none;
`;

const Radio = styled.input`
  margin: 0 1rem;
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {
  // objeto
  const [datos, guaradarDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  // estado de error
  const [error, guaradarError] = useState(false);

  // extraer valores del estado
  const { marca, year, plan } = datos;

  // leer el formulario y actualziar el stado
  const obtenerInformacion = (event) => {
    guaradarDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  // eventosubmit
  const cotizarSeguro = (event) => {
    event.preventDefault();
    // validar los campos
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      guaradarError(true);
      return;
    }
    guaradarError(false);

    // una base de 2000
    let resultado = 2000;

    // obtener la diferencia de a;os
    const diferencia = obtenerDiferenciaYear(year);
    //console.log(diferencia);

    // por cada a;o hya que restar el 3%
    resultado -= (diferencia * 3 * resultado) / 100;
    //console.log(resultado);

    // Americano 15%
    // Asiatico 5%
    // Europeo 30%
    resultado = calcularMarca(marca) * resultado;
    //console.log(resultado);

    // plan basico 205
    // completo 50%
    const incrementarPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementarPlan * resultado).toFixed(2);
    //console.log(incrementarPlan);

    //console.log(resultado);
    guardarCargando(true);

    setTimeout(() => {
      guardarCargando(false);
      // total
      guardarResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 3000);
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca: </Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Año: </Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Plan: </Label>
        <Radio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />
        Basico
        <Radio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />
        Completo
      </Campo>

      <Boton type="submit">Cotizado</Boton>
    </form>
  );
};

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired
}

export default Formulario;
