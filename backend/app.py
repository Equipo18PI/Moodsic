from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

app = Flask(__name__, static_folder="static", template_folder="templates")  # 👈 ESTA VARIABLE DEBE LLAMARSE app
CORS(app)

# Inicializa el cliente de OpenAI usando la API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    app.logger.warning("⚠️ No se ha configurado la clave OPENAI_API_KEY.")
client = OpenAI(api_key=OPENAI_API_KEY)


@app.route("/")
def index():
    """Carga la interfaz principal del chat."""
    return render_template("index.html")


@app.route("/api/chat", methods=["POST"])
def chat():
    """Recibe un mensaje del usuario, analiza su estado de ánimo y recomienda canciones."""
    data = request.get_json()
    message = data.get("message", "").strip()

    if not message:
        return jsonify({"error": "Empty message"}), 400
    if not OPENAI_API_KEY:
        return jsonify({"error": "API key not configured"}), 500

    # Mensaje de sistema que define el rol del asistente
    system_prompt = (
        "You are Moodsic, an empathetic assistant who analyzes the user's message "
        "to determine their emotional state (mood) and recommends from 5 up to 10 songs that match it. "
        "Respond with a short summary including the mood, an explanation, and song titles."
    )

    try:
        # Llamada a la API de OpenAI
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # puedes cambiar a "gpt-4-turbo" si lo prefieres
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message},
            ],
            temperature=0.8,
            max_tokens=250,
        )

        reply = response.choices[0].message.content.strip()
        return jsonify({"reply": reply})

    except Exception as e:
        app.logger.exception("Error al contactar con OpenAI:")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
