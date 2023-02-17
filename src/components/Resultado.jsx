import React from "react";
import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const Mensaje = styled.p`
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;

const Resultado = styled.div`
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #26c6da;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;

const Cotizacion = styled.p`
  color: #00838f;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

const Sesultado = ({ cotizacion }) => {
  return cotizacion === 0 ? (
    <Mensaje>Elige la marca, el año y tipo de seguro</Mensaje>
  ) : (
    <Resultado>
      <TransitionGroup component="span" className="resultado">
        <CSSTransition
          classNames="resultado"
          key={cotizacion}
          timeout={{ enter: 500, exit: 500 }}
        >
          <Cotizacion>
            {" "}
            el total es: $ <span>{cotizacion}</span>{" "}
          </Cotizacion>
        </CSSTransition>
      </TransitionGroup>
    </Resultado>
  );
};

Resultado.propTypes = {
  cotizacion: PropTypes.number.isRequired,
};

export default Sesultado;
