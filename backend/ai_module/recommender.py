import requests
from google import genai
from config import Config

client = genai.Client(api_key=Config.GEMINI_API_KEY)

# Función para interactuar con una API de música real (ej. Spotify, Genius)
# Debería usar las credenciales de Spotify/Genius desde config.py
def search_music_api(mood_keywords, music_type):
    # En un proyecto real, esto haría llamadas a la API de Spotify
    # para buscar canciones basadas en 'mood_keywords', 'music_type', 
    # y 'audio_features' como 'valence' (felicidad) y 'energy'.
    
    # Por simplicidad, retornaremos datos mockeados
    if 'alegre' in mood_keywords:
        return [
            {"title": "Feliz Ritmo", "artist": "Artista A", "url": "#"},
            {"title": "Bailando", "artist": "Artista B", "url": "#"}
        ]
    return [
        {"title": "Canción Triste", "artist": "Artista X", "url": "#"},
        {"title": "Melancolía", "artist": "Artista Y", "url": "#"}
    ]

def get_ai_recommendation(user_mood, music_type):
    # 1. Análisis de Sentimiento/Generación de Keywords usando Gemini
    prompt = (
        f"Analiza el siguiente estado de ánimo: '{user_mood}'. "
        f"Genera 5 palabras clave de mood y emoción separadas por comas. "
        f"NO incluyas explicaciones. SOLO las 5 palabras clave."
    )
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        mood_keywords_str = response.text.strip()
        mood_keywords = [k.strip().lower() for k in mood_keywords_str.split(',')]
        
    except Exception as e:
        print(f"Error en la llamada a la API de Gemini: {e}")
        mood_keywords = ["calma", "tranquilidad", "reflexivo"] # Fallback

    # 2. Búsqueda de Música usando Keywords y Tipo
    recommendations = search_music_api(mood_keywords, music_type)

    return recommendations