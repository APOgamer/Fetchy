import PropTypes from "prop-types";

import "./ConcepList.css"

export const ConceptList = ({
  mostrarAñadir,
  resultado,
  handleConceptoSeleccionado,
  setMostrarAñadir,
}) => {

  return (
    <>
      {!mostrarAñadir && (
        <div className="contenedor-generar-lista-nombre-conceptos">
          {resultado && resultado.length > 0 && (
            <ul className="ul-lista-conceptos">
              {resultado.map((concepto, index) => {
                if (concepto.nombre === "añadirConcepto") {
                  return (
                    <div>
                      <button className="btn-añdir-concepto" onClick={() => setMostrarAñadir(true)}>
                        añadir
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <li
                      key={index}
                      className="concepto-coincidente"
                      onClick={() => handleConceptoSeleccionado(concepto)}
                    >
                      {concepto.nombre}
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

ConceptList.propTypes = {
  mostrarAñadir: PropTypes.bool.isRequired,
  resultado: PropTypes.array.isRequired,
  handleConceptoSeleccionado: PropTypes.func.isRequired,
};
