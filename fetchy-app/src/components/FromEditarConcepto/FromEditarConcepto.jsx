import React from 'react'

export const FromEditarConcepto = ({setEditarConcepto,submitActualizar}) => {
  return (
    <form onSubmit={(e) => submitActualizar(e)}>
              <input
                className="input"
                placeholder="nombre"
                type="text"
                onChange={(e) =>
                  setEditarConcepto((prev) => ({
                    ...prev,
                    nombre: e.target.value,
                  }))
                }
              />
              <input
                placeholder="descripcion"
                className="input"
                type="text"
                onChange={(e) =>
                  setEditarConcepto((prev) => ({
                    ...prev,
                    descripcion: e.target.value,
                  }))
                }
              />
              <input
                placeholder="ejemplo"
                className="input"
                type="text"
                onChange={(e) =>
                  setEditarConcepto((prev) => ({
                    ...prev,
                    ejemplo: e.target.value,
                  }))
                }
              />
              <button className="button">actualizar</button>
            </form>
  )

}
