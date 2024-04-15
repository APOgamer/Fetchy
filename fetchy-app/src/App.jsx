import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import "./styles/app.css";
import { ConceptList } from "./components/ConceptList/ConceptList";
import { CreateConceptForm } from "./components/CreateConceptForm/CreateConceptForm";
import { SearchBar } from "./components/Searchbar/SearchBar";
import { SelectedConcept } from "./components/SelectedConcept/SelectedConcept";
import "./styles/app.css";
import "./components/ConceptList/ConceptList";
import { v4 as uuidv4 } from "uuid"; // Importa uuidv4 desde el paquete uuid

export const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState([]);
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);
  const [nuevoConcepto, setNuevoConcepto] = useState({
    nombre: "",
    descripcion: "",
    ejemplo: "",
    urls: [],
  });

  const [mostrarAñadir, setMostrarAñadir] = useState(false);
  const [crud, setCrud] = useState({
    eliminar: false,
    actualizar: false,
  });

  const[error,setError] = useState("")
  


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("conceptos"));
    if (!data) {
      localStorage.setItem("conceptos", JSON.stringify([]));
    }
  }, []);


  useEffect(() => {
    cargarDatos();
  }, [crud]);

  const cargarDatos = () => {
    const conceptosGuardados =
      JSON.parse(localStorage.getItem("conceptos")) || [];
    setResultado(conceptosGuardados);
  };

  const buscarConcepto = (termino) => {
    const conceptosGuardados =
      JSON.parse(localStorage.getItem("conceptos")) || [];
    const fuse = new Fuse(conceptosGuardados, {
      keys: ["nombre"],
      includeScore: true,
      threshold: 0.3,
    });
    const resultados = fuse.search(termino);
    return resultados.map((resultado) => resultado.item);
  };

  const handleChange = (event) => {
    const termino = event.target.value;
    setBusqueda(termino);
    const conceptosCoincidentes = buscarConcepto(termino);
    setResultado(conceptosCoincidentes);
    setConceptoSeleccionado(null);
  };

  const handleConceptoSeleccionado = (concepto) => {
    setConceptoSeleccionado(concepto);
    setBusqueda("");
    setResultado([]);
  };

  const handleNuevoConceptoChange = (event) => {
    const { name, value } = event.target;
    setNuevoConcepto({
      ...nuevoConcepto,
      [name]: value,
    });
  };
  
  const handleAddUrl = () => {
    setNuevoConcepto({
      ...nuevoConcepto,
      urls: [...nuevoConcepto.urls, ""],
    });
  };


  const handleUrlChange = (index, value) => {
    const urls = [...nuevoConcepto.urls];
    urls[index] = value;
    setNuevoConcepto({
      ...nuevoConcepto,
      urls
    });
  };

  const handleNuevoConceptoSubmit = (event) => {
    event.preventDefault();
    let pene = true;

    const x = JSON.parse(localStorage.getItem("conceptos"));
    x.forEach((concepto) => {
      if (concepto.nombre === nuevoConcepto.nombre) {
        setError("che capo ya exite el nombre del concepto")
        pene = false;
        return;
      }
    });

    if (pene) {

      crearConcepto(
        nuevoConcepto.nombre,
        nuevoConcepto.descripcion,
        nuevoConcepto.ejemplo,
        nuevoConcepto.urls,
        setError("")
      );
      cargarDatos();
      setNuevoConcepto({
        nombre: "",
        descripcion: "",
        ejemplo: "",
        urls: [],
      });
      setMostrarAñadir(false);
    }
  };

  const crearConcepto = (nombre, descripcion, ejemplo, urls) => {
    // GENERRA UN ID ALEATOREO
    const nuevoId = uuidv4();
    const nuevoConcepto = { nombre, descripcion, ejemplo, urls, id: nuevoId };
    const conceptosGuardados =  JSON.parse(localStorage.getItem("conceptos")) || [];
    conceptosGuardados.push(nuevoConcepto);
    localStorage.setItem("conceptos", JSON.stringify(conceptosGuardados));
  };
  const handleBuscar = () => {
    if (resultado.length > 0) {
      handleConceptoSeleccionado(resultado[0]);
    } else {
      window.location.href = `https://www.google.com/search?q=${busqueda}`;
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleBuscar();
    }
  };

  return (
    <div className="app">
      <SearchBar
        busqueda={busqueda}
        handleChange={handleChange}
        handleBuscar={handleBuscar}
        handleKeyPress={handleKeyPress}
        setMostrarAñadir={setMostrarAñadir}
        mostrarAñadir={mostrarAñadir}
      />
      <ConceptList
        mostrarAñadir={mostrarAñadir}
        resultado={resultado}
        handleConceptoSeleccionado={handleConceptoSeleccionado}
      />
      <SelectedConcept
        setCrud={setCrud}
        conceptoSeleccionado={conceptoSeleccionado}
      />
      <CreateConceptForm
        error={error}
        mostrarAñadir={mostrarAñadir}
        nuevoConcepto={nuevoConcepto}
        handleNuevoConceptoChange={handleNuevoConceptoChange}
        handleAddUrl={handleAddUrl}
        handleUrlChange={handleUrlChange}
        handleNuevoConceptoSubmit={handleNuevoConceptoSubmit}
      />
    </div>
  );
};
