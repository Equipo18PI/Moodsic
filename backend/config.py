import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Clave secreta para la seguridad de la aplicación y JWT
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'una_clave_secreta_por_defecto_muy_larga'
    
    # Configuración de la Base de Datos (adaptar a Render: PostgreSQL)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Claves de APIs
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
    SPOTIFY_CLIENT_ID = os.environ.get('SPOTIFY_CLIENT_ID')
    SPOTIFY_CLIENT_SECRET = os.environ.get('SPOTIFY_CLIENT_SECRET')