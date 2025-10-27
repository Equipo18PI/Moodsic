import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await registerUser(formData);
            setMessage("¡Registro exitoso! Redirigiendo a Iniciar Sesión...");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrarse. Intenta de nuevo.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Crear Cuenta</h2>
            {message && <p className="text-green-600 text-center mb-4 border border-green-200 p-2 rounded">{message}</p>}
            {error && <p className="text-red-500 text-center mb-4 border border-red-200 p-2 rounded">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-150"
                >
                    Registrarse
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Inicia Sesión</Link>
            </p>
        </div>
    );
};

export default Register;