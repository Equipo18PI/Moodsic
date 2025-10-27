from flask import Flask
from flask_cors import CORS
from config import Config
from models import db, bcrypt, User # Importa modelos y herramientas de DB
from routes.auth import auth_bp
from routes.music import music_bp # Importa los Blueprints

app = Flask(__name__)
app.config.from_object(Config)

# Inicializar extensiones
db.init_app(app)
bcrypt.init_app(app)
CORS(app) # Habilita CORS para el Front-end

# Registrar Blueprints (grupos de rutas)
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(music_bp, url_prefix='/api/music')

# Configuración inicial de la DB
with app.app_context():
    db.create_all() # Crea las tablas si no existen

if __name__ == '__main__':
    # Render usa Gunicorn, pero para desarrollo local usamos el servidor de Flask
    app.run(debug=True)