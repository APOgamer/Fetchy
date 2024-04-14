import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import "./styles/app.css";
import SearchBar from "./components/SearchBar";
import ConceptList from "./components/ConceptList";
import SelectedConcept from "./components/SelectedConcept";
import CreateConceptForm from "./components/CreateConceptForm";

function App() {
    const [busqueda, setBusqueda] = useState('');
    const [resultado, setResultado] = useState([]);
    const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);
    const [nuevoConcepto, setNuevoConcepto] = useState({
        nombre: '',
        descripcion: '',
        ejemplo: '',
        urls: [],
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = () => {
        const conceptosGuardados = JSON.parse(localStorage.getItem('conceptos')) || [];
        setResultado(conceptosGuardados);
    };

    const buscarConcepto = (termino) => {
        const conceptosGuardados = JSON.parse(localStorage.getItem('conceptos')) || [];
        const fuse = new Fuse(conceptosGuardados, {
            keys: ["nombre"],
            includeScore: true,
            threshold: 0.3,
        });
        const resultados = fuse.search(termino);
        return resultados.map(resultado => resultado.item);
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
        setBusqueda('');
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
            urls: [...nuevoConcepto.urls, ''],
        });
    };

    const handleUrlChange = (index, value) => {
        const urls = [...nuevoConcepto.urls];
        urls[index] = value;
        setNuevoConcepto({
            ...nuevoConcepto,
            urls,
        });
    };

    const handleNuevoConceptoSubmit = (event) => {
        event.preventDefault();
        crearConcepto(nuevoConcepto.nombre, nuevoConcepto.descripcion, nuevoConcepto.ejemplo, nuevoConcepto.urls);
        cargarDatos();
        setNuevoConcepto({
            nombre: '',
            descripcion: '',
            ejemplo: '',
            urls: [],
        });
    };

    const crearConcepto = (nombre, descripcion, ejemplo, urls) => {
        const nuevoConcepto = { nombre, descripcion, ejemplo, urls };
        const conceptosGuardados = JSON.parse(localStorage.getItem('conceptos')) || [];
        conceptosGuardados.push(nuevoConcepto);
        localStorage.setItem('conceptos', JSON.stringify(conceptosGuardados));
    };

    const handleBuscar = () => {
        if (resultado.length > 0) {
            handleConceptoSeleccionado(resultado[0]);
        } else {
            window.location.href = `https://www.google.com/search?q=${busqueda}`;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleBuscar();
        }
    };

    return (
        <div className="app">
            <h1>Buscar y Crear Conceptos</h1>
            <SearchBar
                busqueda={busqueda}
                handleChange={handleChange}
                handleBuscar={handleBuscar}
                handleKeyPress={handleKeyPress}
            />
            <ConceptList
                resultado={resultado}
                handleConceptoSeleccionado={handleConceptoSeleccionado}
            />
            <SelectedConcept conceptoSeleccionado={conceptoSeleccionado} />
            <CreateConceptForm
                nuevoConcepto={nuevoConcepto}
                handleNuevoConceptoChange={handleNuevoConceptoChange}
                handleAddUrl={handleAddUrl}
                handleUrlChange={handleUrlChange}
                handleNuevoConceptoSubmit={handleNuevoConceptoSubmit}
            />
        </div>
    );
}

export default App;
