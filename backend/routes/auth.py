# Importaciones necesarias (ai_module, token_required, etc.)
from flask import Blueprint, jsonify, request  # Asegúrate de importar Blueprint
from .auth import token_required
# ... (Importa aquí tus otras dependencias como recommender, token_required, etc.)

# --- LÍNEA AÑADIDA ---
# Esta es la línea que crea el 'music_bp' antes de usarlo
music_bp = Blueprint('music_bp', __name__)

# --- TU CÓDIGO EMPIEZA AQUÍ ---
@music_bp.route('/recommend', methods=['POST'])
# @token_required # <--- CAMBIO 1: Desactivado temporalmente
def get_recommendations(): # <--- CAMBIO 2: Se quitó 'current_user'
    data = request.get_json()
    user_mood = data.get('mood')  # Ej: "Me siento nostálgico y pensativo"
    music_type = data.get('type') # Ej: "Acústica"

    if not user_mood or not music_type:
        return jsonify({"error": "Faltan datos de mood o tipo de música"}), 400

    # Llama al Módulo de IA
    # ¡Asegúrate de que 'recommender' esté importado arriba!
    recommendations = recommender.get_ai_recommendation(user_mood, music_type)

    # <--- CAMBIO 3: Se quitó 'user' de la respuesta
    return jsonify({"recommendations": recommendations}), 200
