import React, { useState } from 'react';
import { getRecommendations } from '../api/auth';

const RecommendationForm = () => {
    const [mood, setMood] = useState('');
    const [musicType, setMusicType] = useState('Pop');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const musicOptions = ['Pop', 'Rock', 'Electrónica', 'Acústica', 'Jazz', 'Clásica', 'Hip Hop', 'Metal'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRecommendations([]);

        try {
            const response = await getRecommendations({ mood, type: musicType });
            setRecommendations(response.data.recommendations);
        } catch (err) {
            setError(err.response?.data?.message || "Error al obtener recomendaciones. Asegúrate de estar logueado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">¿Cómo te Sientes Hoy?</h2>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl space-y-6">
                
                {/* 1. Entrada de Estado de Ánimo */}
                <div>
                    <label htmlFor="mood" className="block text-lg font-medium text-gray-700 mb-2">Describe tu estado de ánimo:</label>
                    <textarea
                        id="mood"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        required
                        rows="3"
                        placeholder="Ej: Me siento melancólico y necesito algo que me haga pensar en la lluvia..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    ></textarea>
                </div>

                {/* 2. Selector de Tipo de Música */}
                <div>
                    <label htmlFor="musicType" className="block text-lg font-medium text-gray-700 mb-2">Tipo de Música Deseado:</label>
                    <select
                        id="musicType"
                        value={musicType}
                        onChange={(e) => setMusicType(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none"
                    >
                        {musicOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* 3. Botón de Búsqueda */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-150 flex items-center justify-center disabled:bg-gray-400"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Buscando el Flow...
                        </>
                    ) : (
                        "Obtener Recomendaciones 🎵"
                    )}
                </button>
            </form>

            {/* 4. Mostrar Resultados */}
            <div className="mt-10">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                {recommendations.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-2xl font-bold mb-4 text-indigo-600">Recomendaciones para tu Mood:</h3>
                        <ul className="space-y-4">
                            {recommendations.map((song, index) => (
                                <li key={index} className="flex justify-between items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded">
                                    <div>
                                        <p className="font-semibold text-lg">{song.title}</p>
                                        <p className="text-gray-500 text-sm">por {song.artist}</p>
                                    </div>
                                    <a
                                        href={song.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        Escuchar
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationForm;