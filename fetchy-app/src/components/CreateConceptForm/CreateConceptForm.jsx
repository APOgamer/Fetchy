import PropTypes from "prop-types";

export const CreateConceptForm = ({
  nuevoConcepto,
  handleNuevoConceptoChange,
  handleAddUrl,
  handleUrlChange,
  handleNuevoConceptoSubmit,
  mostrarAñadir,
  error
}) => {

  return (
    <div className="contenedor-añadir-concepto">
      <span className="span">{error} </span>
      {mostrarAñadir && (
        <form
          className="form-añadir-concepto"
          onSubmit={handleNuevoConceptoSubmit}
        >
          <input
            type="text"
            placeholder="nombre"
            className="input"
            name="nombre"
            value={nuevoConcepto.nombre}
            onChange={handleNuevoConceptoChange}
          />

          <textarea
            type="text"
            placeholder="descripcion"
            className="input"
            name="descripcion"
            value={nuevoConcepto.descripcion}
            onChange={handleNuevoConceptoChange}
          />

          <textarea
            type="text"
            placeholder="ejemplo"
            className="input"
            name="ejemplo"
            value={nuevoConcepto.ejemplo}
            onChange={handleNuevoConceptoChange}
          />

          <label>
            {nuevoConcepto.urls.map((url, index) => (
              <div  key={index}>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                />
              </div>
            ))}
            <button className="button" type="button" onClick={handleAddUrl}>
              Agregar URL
            </button>
          </label>
          <button  className="button" type="submit">Crear Concepto.</button>
        </form>
      )}
    </div>
  );
};

CreateConceptForm.propTypes = {
  nuevoConcepto: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    ejemplo: PropTypes.string.isRequired,
    urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleNuevoConceptoChange: PropTypes.func.isRequired,
  handleAddUrl: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleNuevoConceptoSubmit: PropTypes.func.isRequired,
  mostrarAñadir: PropTypes.bool, 
  error: PropTypes.string
};

