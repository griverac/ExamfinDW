// src/components/ProyectoForm.jsx

import React, { useState } from 'react';

const ProyectoForm = ({ onSubmit }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_vencimiento, setFechaVencimiento] = useState('');
    const [prioridad, setPrioridad] = useState('media');
    const [asignado_a, setAsignadoA] = useState('');
    const [categoria, setCategoria] = useState('');
    const [costo_proyecto, setCostoProyecto] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación simple para costo del proyecto
        if (costo_proyecto <= 0) {
            alert("El costo del proyecto debe ser un número positivo.");
            return;
        }

        try {
            // 1. Llamar a la función onSubmit para guardar el proyecto en la base de datos
            const proyectoData = {
                titulo, 
                descripcion, 
                fecha_vencimiento, 
                prioridad, 
                asignado_a, 
                categoria, 
                costo_proyecto: parseFloat(costo_proyecto) // Convertir a número
            };

            const proyectoResponse = await fetch('http://localhost:3000/api/proyectos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proyectoData),
            });

            if (!proyectoResponse.ok) {
                throw new Error('Error al crear el proyecto');
            }

            const proyecto = await proyectoResponse.json();

            // 2. Realiza la solicitud para crear una sesión de pago en Stripe
            const paymentResponse = await fetch('http://localhost:3000/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: costo_proyecto * 100, // Multiplica por 100 para centavos
                    currency: 'usd', // Cambia a la moneda que estés utilizando
                    title: titulo,
                }),
            });

            const { id } = await paymentResponse.json();

            // 3. Redirigir al usuario a Stripe Checkout
            const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Asegúrate de cargar la clave pública en el frontend
            await stripe.redirectToCheckout({ sessionId: id });

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al procesar la solicitud. Inténtalo de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    type="date"
                    value={fecha_vencimiento}
                    onChange={(e) => setFechaVencimiento(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} className="form-select">
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Asignado a"
                    value={asignado_a}
                    onChange={(e) => setAsignadoA(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Categoría"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    placeholder="Costo del Proyecto"
                    value={costo_proyecto}
                    onChange={(e) => setCostoProyecto(e.target.value)}
                    className="form-control"
                    min="0" // Asegurando que no se puedan ingresar valores negativos
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Guardar Proyecto y Pagar</button>
        </form>
    );
};

export default ProyectoForm;
