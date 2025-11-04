# Importaciones necesarias (ASEGÚRATE DE AÑADIR ESTAS)
from flask import Blueprint, jsonify, request, current_app
from ..models import User, db, bcrypt # Asumo que 'models' está en el mismo nivel
import jwt
import datetime
from functools import wraps

# Esta es la línea que crea el 'auth_bp' antes de usarlo
auth_bp = Blueprint('auth_bp', __name__)


def generate_token(user_id):
    # Lógica para generar un JWT con la ID del usuario y fecha de expiración
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1), # Expira en 1 día
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        # Usa el 'JWT_SECRET' que pusiste en Render
        return jwt.encode(
            payload,
            current_app.config['JWT_SECRET'],
            algorithm='HS256'
        )
    except Exception as e:
        return str(e)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # 1. Validar que el usuario no exista
    user = User.query.filter_by(email=data.get('email')).first()
    if user:
        return jsonify({"error": "El email ya está registrado"}), 400
    
    # 2. Crear instancia de User y hashear la contraseña
    hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    new_user = User(
        username=data.get('username'), 
        email=data.get('email'), 
        password=hashed_password
    )
    
    # 3. Guardar en la DB
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "Usuario registrado exitosamente"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # 1. Buscar usuario por email/username
    user = User.query.filter_by(email=email).first()

    # 2. Verificar la contraseña con bcrypt.check_password()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    # 3. Si es correcto, generar un JWT
    token = generate_token(user.id)
    
    # 4. Retornar el token al Front-end
    return jsonify({"token": token}), 200

# Decorador de ayuda para proteger rutas
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Lógica para verificar el JWT en el encabezado de la petición
        if 'Authorization' in request.headers:
            # Espera un token "Bearer <token>"
            token_parts = request.headers['Authorization'].split()
            if len(token_parts) == 2 and token_parts[0].lower() == 'bearer':
                token = token_parts[1]

        if not token:
            return jsonify({'error': 'Token no encontrado'}), 401

        try:
            # Decodifica el token con el mismo 'JWT_SECRET'
            data = jwt.decode(token, current_app.config['JWT_SECRET'], algorithms=['HS256'])
            current_user = User.query.get(data['sub'])
            if not current_user:
                return jsonify({'error': 'Usuario no válido'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'El token ha expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401

        # Si es válido, pasa la función 'f' con el usuario decodificado
        return f(current_user, *args, **kwargs)
    return decorated
