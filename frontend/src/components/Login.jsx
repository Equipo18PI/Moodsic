import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await loginUser({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Error al iniciar sesión.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Bienvenido a Moodsic</h2>
            {error && <p className="text-red-500 text-center mb-4 border border-red-200 p-2 rounded">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-150"
                >
                    Iniciar Sesión
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                ¿No tienes cuenta? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Regístrate</Link>
            </p>
        </div>
    );
};

export default Login;