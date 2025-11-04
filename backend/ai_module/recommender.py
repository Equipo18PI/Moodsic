# --- Módulo de IA Falso ---
# Esto simula ser el recomendador de IA para evitar el error de Google
# y permitir que el servidor arranque.

# 1. Creamos una clase falsa que imita a tu recomendador real
class FakeRecommender:
    
    # 2. Esta es la función que tu archivo 'music.py' espera que exista
    def get_ai_recommendation(self, mood, type):
        
        # 3. Imprime en los logs de Render para que sepas que se está usando
        print(f"--- IA FALSA: Recibí mood='{mood}', type='{type}' ---")
        
        # 4. Devuelve una lista de canciones falsas (datos de ejemplo)
        #    Esto simula lo que haría tu función 'search_music_api'
        if 'alegre' in mood:
            return [
                {"title": "Feliz Ritmo (Falso)", "artist": "Artista A", "url": "#"},
                {"title": "Bailando (Falso)", "artist": "Artista B", "url": "#"}
            ]
        return [
            {"title": "Canción Triste (Falsa)", "artist": "Artista X", "url": "#"},
            {"title": "Melancolía (Falsa)", "artist": "Artista Y", "url": "#"}
        ]

# 5. Creamos la variable 'recommender' que tu archivo 'music.py'
#    intenta importar.
recommender = FakeRecommender()
