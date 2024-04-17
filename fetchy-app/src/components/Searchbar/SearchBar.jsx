import PropTypes from "prop-types";
import "./Searchbar.css";
export const SearchBar = ({
  mostrarAñadir,
  busqueda,
  handleChange,
  handleBuscar,
  /* eslint-disable no-unused-vars */
  handleKeyPress,
}) => {
  return (
   <div style={{height:"200px",display:"flex",alignItems:"center",}}>
     {
      !mostrarAñadir && (<div style={{display:"flex",alignItems:"center"}}>
      <form className="form">
    <label htmlFor="search">
      <input
      value={busqueda}
      onChange={handleChange}
        required=""
        autoComplete="off"
        placeholder="search your chats"
        id="search"
        type="text"
      />
      <button type="reset" className="close-btn" onClick={handleBuscar}>
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8.5 15a6.5 6.5 0 111.48-1.48l5.347
             5.346a1 1 0 11-1.415 1.415l-5.347-5.346A6.472
              6.472 0 018.5 15zm0-11.5a5 5 0 100 10 5 5 0 000-10z"
          ></path>
        </svg>
      </button>
    </label>
  </form>
  </div>)
     }
   </div>

  );
};

SearchBar.propTypes = {
    mostrarAñadir: PropTypes.bool.isRequired,
    busqueda: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBuscar: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    setMostrarAñadir: PropTypes.func.isRequired,
  };
  