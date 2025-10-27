import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';

const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <header className="bg-indigo-700 text-white shadow-lg">
            <div className="container mx-auto p-4 flex justify-between items-center max-w-4xl">
                <Link to="/" className="text-2xl font-extrabold tracking-wider">
                    Moodsic 🎶
                </Link>
                <nav>
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-150"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="hover:text-indigo-200">
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className="bg-indigo-500 hover:bg-indigo-400 font-semibold py-2 px-4 rounded transition duration-150">
                                Registrarse
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;