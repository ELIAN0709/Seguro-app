import React from "react";
import styled from "@emotion/styled";
import { mayuscula } from "../Helper";
import PropTypes from 'prop-types';


const Contenedor = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #fff;
    margin-top: 1rem;
    font-size: 20px;
`;


const Resumen = ({ datos }) => {
  // desempaquetar
  const { marca, year, plan } = datos;

  // extraer la informacion de losdatos para presentar
  if (marca === "" || year === "" || plan === "") {
    return null;
  }
  return (
    <Contenedor>
      <h2>Resumen de la cotizacion</h2>
      <ul>
        <li>Marca: {mayuscula(marca)}</li>
        <li>Plan: {mayuscula(plan)}</li>
        <li>Año del auto: {year} </li>
      </ul>
    </Contenedor>
  );
};

Resumen.propTypes = {
  datos: PropTypes.object.isRequired
}

export default Resumen;
