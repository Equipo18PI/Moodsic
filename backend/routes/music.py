# Importaciones necesarias
from flask import Blueprint, jsonify, request  # Asegúrate de importar Blueprint
# from routes.auth import token_required # <-- Seguridad desactivada
from ai_module_recommender.py import recommender.py # <-- Importa la IA falsa

# Esta es la línea que crea el 'music_bp' antes de usarlo
music_bp = Blueprint('music_bp', __name__)

@music_bp.route('/recommend', methods=['POST'])
# @token_required # <-- Seguridad desactivada
def get_recommendations(): # <-- 'current_user' eliminado
    data = request.get_json()
    user_mood = data.get('mood')  # Ej: "Me siento nostálgico y pensativo"
    music_type = data.get('type') # Ej: "Acústica"

    if not user_mood or not music_type:
        return jsonify({"error": "Faltan datos de mood o tipo de música"}), 400

    # Llama al Módulo de IA (el falso que hicimos)
    recommendations = recommender.get_ai_recommendation(user_mood, music_type)

    # <-- Respuesta sin 'user'
    return jsonify({"recommendations": recommendations}), 200
