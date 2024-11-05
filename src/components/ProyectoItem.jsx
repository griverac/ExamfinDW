// src/components/ProyectoItem.jsx

import React from 'react';

const ProyectoItem = ({ proyecto, onEliminar }) => {
    const handleEliminar = () => {
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
        if (confirmar) {
            onEliminar(proyecto.id);
        }
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h5>{proyecto.titulo}</h5>
                <p>{proyecto.descripcion}</p>
                <small className="text-muted">Vencimiento: {proyecto.fecha_vencimiento}</small><br />
                <small className="text-muted">Prioridad: {proyecto.prioridad}</small><br />
                <small className="text-muted">Costo: ${proyecto.costo_proyecto.toFixed(2)}</small><br />
                <small className="text-muted">Estado: {proyecto.completada ? 'Completado' : 'Pendiente'}</small>
            </div>
            <button onClick={handleEliminar} className="btn btn-danger">Eliminar</button>
        </li>
    );
};

export default ProyectoItem;
