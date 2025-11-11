from flask import Flask, request, jsonify, render_template_string, url_for
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Importaciones de Google Gemini
from google import genai
from google.genai.errors import APIError 

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuración de Google Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") 
GEMINI_MODEL = "gemini-2.5-flash" 


# HTML SIMPLIFICADO Y LIMPIO: Usa url_for para enlazar CSS y JS
HTML_PAGE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moodsic AI Chat</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">Moodsic AI Chat 🎵</div>
        <div class="chat-body" id="chat-body">
            <div class="message bot">Hola! Soy tu Moodsic AI — lista para recomendarte música.</div>
        </div>
        <div class="chat-input">
            <input type="text" id="userInput" placeholder="Escribe tu mensaje..." />
            <button onclick="sendMessage()">Enviar</button>
        </div>
    </div>
    <script src="{{ url_for('static', filename='script.js') }}"></script>
</body>
</html>
"""

# Página principal
@app.route("/")
def home():
    # Flask sirve el HTML y resuelve la ruta de los archivos estáticos
    return render_template_string(HTML_PAGE)


# Endpoint del chat
@app.route("/api/chat", methods=["POST"])
def chat():
    # 1. Verificación de la clave API
    if not GEMINI_API_KEY:
        return jsonify({"error": "Error: GEMINI_API_KEY no configurada. Por favor, revisa el archivo .env."}), 500

    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"error": "No message provided"}), 400

    # 2. Instrucción del sistema para definir el rol del bot
    system_instruction = "You are Moodsic AI, a friendly and helpful assistant that recommends music based on mood. Respond kindly and briefly in Spanish."
    
    try:
        # 3. Llamar al modelo Gemini
        client = genai.Client(api_key=GEMINI_API_KEY)

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=message,
            config={"system_instruction": system_instruction}
        )
        
        reply = response.text.strip()
        return jsonify({"reply": reply})

    except APIError as e:
        print(f"Gemini API Error: {e}")
        return jsonify({"error": f"Error de la API de Gemini: {e}"}), 500
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return jsonify({"error": f"Ocurrió un error inesperado: {e}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)