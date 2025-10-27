# Moodsic
Proyecto de musica segun tu busqueda
🎶 Moodsic: Tu IA Personal de Recomendación Musical por Estado de Ánimo
Moodsic es una aplicación que combina el poder de la Inteligencia Artificial y el procesamiento de lenguaje natural (NLP) para crear listas de reproducción personalizadas. Simplemente describe cómo te sientes y qué estilo de música deseas, y nuestra IA buscará canciones cuyas letras y ritmos se alineen perfectamente con tu estado de ánimo.

🌟 Características Principales
Recomendación Inteligente: Utiliza un modelo de IA para analizar el sentimiento y el tema del texto ingresado por el usuario.

Filtrado por Mood y Género: Ofrece sugerencias musicales que coinciden tanto con el estado emocional (letras) como con el tipo de música (ritmo/género) deseado.

Autenticación de Usuario: Control de acceso al sistema (log in) para una experiencia personalizada.

Arquitectura Moderna: Separación clara entre Front-end (React/Vue), Back-end (Python/Node.js) y el Módulo de IA.

🛠️ Arquitectura del Proyecto
El proyecto está dividido en tres componentes principales:

Front-end: Desarrollado con [Mencionar Tecnología: Ej. React] y desplegado en Render como Static Site.

Back-end (API): Desarrollado con [Mencionar Tecnología: Ej. Python/Flask] y desplegado en Render como Web Service. Maneja la autenticación y actúa como intermediario con la IA.

Módulo de IA: Se ejecuta dentro del Back-end, utilizando [Mencionar Tecnología: Ej. una API de LLM o librerías de NLP como NLTK] para el análisis de sentimiento.