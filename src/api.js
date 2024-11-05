// src/api.js

const API_URL = 'http://localhost:3000/api/proyectos';
const API_PAGO_URL = 'http://localhost:3000/api/pago'; 

// Obtener todos los proyectos
export const obtenerProyectos = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error; 
    }
};

// Crear un nuevo proyecto
export const crearProyecto = async (proyecto) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proyecto),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
};

// Crear un nuevo pago
export const crearPago = async (pago) => {
    try {
        const response = await fetch(API_PAGO_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pago),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error al crear el pago:', error);
        throw error; 
    }
};

// Actualizar un proyecto
export const actualizarProyecto = async (id, proyecto) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proyecto),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        throw error; 
    }
};

// Eliminar un proyecto
export const eliminarProyecto = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        throw error; 
    }
};
