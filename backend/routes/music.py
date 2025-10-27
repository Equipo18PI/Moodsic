# Importaciones necesarias (ai_module, token_required, etc.)

@music_bp.route('/recommend', methods=['POST'])
@token_required # Asegura que solo usuarios logueados puedan acceder
def get_recommendations(current_user):
    data = request.get_json()
    user_mood = data.get('mood')  # Ej: "Me siento nostálgico y pensativo"
    music_type = data.get('type') # Ej: "Acústica"

    if not user_mood or not music_type:
        return jsonify({"error": "Faltan datos de mood o tipo de música"}), 400

    # Llama al Módulo de IA
    recommendations = recommender.get_ai_recommendation(user_mood, music_type)

    return jsonify({"user": current_user.username, "recommendations": recommendations}), 200