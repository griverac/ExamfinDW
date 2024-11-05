// src/components/ProyectoList.jsx

import React from 'react';
import { eliminarProyecto } from '../api';
import ProyectoItem from './ProyectoItem';

const ProyectoList = ({ proyectos, setProyectos }) => {
    const handleEliminar = async (id) => {
        await eliminarProyecto(id);
        // Filtra el proyecto eliminado
        setProyectos(proyectos.filter((proyecto) => proyecto.id !== id));
    };

    return (
        <div>
            <h2 className="mb-4">Lista de Proyectos</h2>
            <ul className="list-group">
                {proyectos.map((proyecto) => (
                    <ProyectoItem key={proyecto.id} proyecto={proyecto} onEliminar={handleEliminar} />
                ))}
            </ul>
        </div>
    );
};

export default ProyectoList;
