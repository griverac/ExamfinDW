// src/App.jsx

import React, { useState, useEffect } from 'react';
import ProyectoForm from './components/ProyectoForm';
import ProyectoList from './components/ProyectoList';
import { crearProyecto, obtenerProyectos } from './api';

const App = () => {
    const [proyectos, setProyectos] = useState([]);

    // Función para cargar los proyectos desde la API
    const fetchProyectos = async () => {
        const data = await obtenerProyectos();
        setProyectos(data);
    };

    useEffect(() => {
        fetchProyectos(); // Carga los proyectos al montar el componente
    }, []);

    const handleSubmit = async (proyecto) => {
        await crearProyecto(proyecto);
        fetchProyectos(); // Vuelve a cargar la lista de proyectos
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Gestor de Proyectos</h1>
            <ProyectoForm onSubmit={handleSubmit} />
            <ProyectoList proyectos={proyectos} setProyectos={setProyectos} />
        </div>
    );
};

export default App;
