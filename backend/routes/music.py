# Importaciones necesarias
from flask import Blueprint, jsonify, request  # Asegúrate de importar Blueprint
# from routes.auth import token_required # <-- CAMBIO 1: Borra o comenta esta línea
from ai_module import recommender 

# Esta es la línea que crea el 'music_bp' antes de usarlo
music_bp = Blueprint('music_bp', __name__)

@music_bp.route('/recommend', methods=['POST'])
# @token_required # <-- CAMBIO 2: Comenta esta línea (ponle un #)
def get_recommendations(): # <-- CAMBIO 3: Quita 'current_user' de aquí
    data = request.get_json()
    user_mood = data.get('mood')  # Ej: "Me siento nostálgico y pensativo"
    music_type = data.get('type') # Ej: "Acústica"

    if not user_mood or not music_type:
        return jsonify({"error": "Faltan datos de mood o tipo de música"}), 400

    # Llama al Módulo de IA (el falso que hicimos)
    recommendations = recommender.get_ai_recommendation(user_mood, music_type)

    # <-- CAMBIO 4: Quita 'user' de la respuesta
    return jsonify({"recommendations": recommendations}), 200
