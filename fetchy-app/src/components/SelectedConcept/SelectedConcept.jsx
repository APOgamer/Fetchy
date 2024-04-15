import { useState } from "react";
import PropTypes from "prop-types";

export const SelectedConcept = ({ conceptoSeleccionado, setCrud }) => {
  //-------------------------------------------------------------------------//
  // STATES
  const [mostrarFormEditar, setMostrarFormEditar] = useState(true);
  const [editarConcepto, setEditarConcepto] = useState({
    nombre: "",
    descripcion: "",
    ejemplo: "",
    urls: [],
  });
  //-------------------------------------------------------------------------//
  //-------------------------------------------------------------------------//
  //FUNCIONES

  // SUBFUNCION  DE SUBMITACTUALIZAR
  const actualizarConcepto = () => {
    const conceptosGuardados = JSON.parse(localStorage.getItem("conceptos"));
    const coceptoParaEditar = conceptosGuardados.find(
      (concepto) => concepto.id === conceptoSeleccionado.id
    );

    // TODO ESTO ESTABIEN PERO LA CAGADA ES QUE NOSE ACTUALIZAR LAS URLS
    const newNombre = editarConcepto.nombre;
    const newConcepto = editarConcepto.descripcion;
    const newEjeplo = editarConcepto.ejemplo;

    const nuevoEjemplo = {
      ...coceptoParaEditar,
      nombre: newNombre ? newNombre : conceptoSeleccionado.nombre,
      descripcion: newConcepto ? newConcepto : conceptoSeleccionado.descripcion,
      ejemplo: newEjeplo ? newEjeplo : conceptoSeleccionado.ejemplo,
    };

    const index = conceptosGuardados.findIndex(
      (concepto) => concepto.id === conceptoSeleccionado.id
    );
    conceptosGuardados[index] = nuevoEjemplo;
    localStorage.setItem("conceptos", JSON.stringify(conceptosGuardados));
    setCrud({
      eliminar: false,
      actualizar: true,
    });
  };

  const submitActualizar = (e) => {
    e.preventDefault();
    actualizarConcepto();
    setMostrarFormEditar(true);
  };

  const eliminarConepto = (id) => {
    const conceptosGuardados = JSON.parse(localStorage.getItem("conceptos"));
    const newConceptos = conceptosGuardados.filter(
      (concepto) => concepto.id !== id
    );
    localStorage.setItem("conceptos", JSON.stringify(newConceptos));
    setCrud({
      eliminar: true,
      actualizar: false,
    });
  };

  //-------------------------------------------------------------------------//
  //-------------------------------------------------------------------------//

  return (
    <div>
      {conceptoSeleccionado && (
        <div>
          {mostrarFormEditar ? (
            <div>
              <h3>Concepto Seleccionado:</h3>
              <p>Nombre: {conceptoSeleccionado.nombre}</p>
              <p>Descripción: {conceptoSeleccionado.descripcion}</p>
              <p>Ejemplo: {conceptoSeleccionado.ejemplo}</p>
              <p>URLs:</p>
            </div>
          ) : (
            <form onSubmit={(e) => submitActualizar(e)}>
              <input
                type="text"
                onChange={(e) =>
                  setEditarConcepto((prev) => ({
                    ...prev,
                    nombre: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                onChange={(e) =>
                  setEditarConcepto((prev) => ({
                    ...prev,
                    descripcion: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                onChange={(e) =>
                  setEditarConcepto((prev) => ({
                    ...prev,
                    ejemplo: e.target.value,
                  }))
                }
              />
              <button>actualizar</button>
              <button onClick={() => setMostrarFormEditar(true)}>regresar</button>
            </form>
          )}
          <ul>
            {conceptoSeleccionado.urls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
          {mostrarFormEditar && (
            <div style={{ margin: "30px 0px" }}>
              <button
                className="button"
                onClick={() => eliminarConepto(conceptoSeleccionado.id)}
              >
                eliminar
              </button>
              <button
                className="button"
                onClick={() => {
                  setMostrarFormEditar(false);
                }}
              >
                Actualizar
              </button>            
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SelectedConcept.propTypes = {
  conceptoSeleccionado: PropTypes.object,
  setCrud: PropTypes.object,
};
