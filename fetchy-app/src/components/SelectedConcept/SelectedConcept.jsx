//import React from "react";
import PropTypes from "prop-types";

export const SelectedConcept = ({ conceptoSeleccionado ,setCrud}) => {



    // -------------------------------------------------------------------//
    // CRUD  (CREADO POR CODY)
    
    const eliminarConepto = (id) => {
        const conceptosGuardados = JSON.parse(localStorage.getItem("conceptos"))
        const newConceptos = conceptosGuardados.filter((concepto)=> concepto.id !== id)
        localStorage.setItem("conceptos",JSON.stringify(newConceptos))
        setCrud({
            eliminar:true,
            actualizar:false
        })
    }
    


    // LA LOGICA YA ESTA PERO TIENE UN PAR DE ERRORRES POR OTRAS COSAS 
    const actualizarConcepto  = (id) => {
        const conceptosGuardados = JSON.parse(localStorage.getItem("conceptos"))
        const coceptoParaEditar=  conceptosGuardados.find(concepto => concepto.id === id)
        // FALTA LOS NUEVOS VALORES DE LOS INPUT 
        const newNombre = "newNombre"
        const newConcepto= "newNombre"
        const newEjeplo = "newNombre"
        const newUrl = []

        const nuevoEjemplo =  {
            ...coceptoParaEditar,
            nombre: newNombre ? newNombre : conceptoSeleccionado.nombre,
            descripcion: newConcepto ? newConcepto : conceptoSeleccionado.descripcion,
            ejemplo: newEjeplo ? newEjeplo : conceptoSeleccionado.ejemplo,
            urls: newUrl ? newUrl : conceptoSeleccionado.url
        }

        const index = conceptosGuardados.findIndex(concepto => concepto.id === id);
        conceptosGuardados[index] = nuevoEjemplo 
        localStorage.setItem("conceptos",JSON.stringify(conceptosGuardados))
        setCrud({
            eliminar:false,
            actualizar:true
        })
        
    }


    return (
        <div>
            {conceptoSeleccionado && (
                <div>
                    <h3>Concepto Seleccionado:</h3>
                    <p>Nombre: {conceptoSeleccionado.nombre}</p>
                    <p>Descripción: {conceptoSeleccionado.descripcion}</p>
                    <p>Ejemplo: {conceptoSeleccionado.ejemplo}</p>
                    <p>URLs:</p>
                    <ul>
                        {conceptoSeleccionado.urls.map((url, index) => (
                            <li key={index}>{url}</li>
                        ))}
                    </ul>
                    <div style={{margin:"30px 0px"}}>
                        <button className="button" onClick={()=>eliminarConepto(conceptoSeleccionado.id)}>eliminar</button>
                        <button className="button" onClick={ ()=> actualizarConcepto(conceptoSeleccionado.id)}>actualizar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

SelectedConcept.propTypes = {
    conceptoSeleccionado: PropTypes.object,
    setCrud:PropTypes.object
};

