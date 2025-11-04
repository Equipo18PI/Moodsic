const API_URL = 'https://moodsic-pp2t.onrender.com/api';

export async function login(email,password){
  const r = await fetch(`${API_URL}/auth/login`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email,password})
  });
  return r.json();
}

export async function register(name,email,password){
  const r = await fetch(`${API_URL}/auth/register`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name,email,password})
  });
  return r.json();
}

export async function analyze(text, token){
  
  // Arregla la URL para que coincida con tu backend
  const r = await fetch(`${API_URL}/music/recommend`, { // <-- CAMBIO DE RUTA
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    // Envía 'mood' y 'type' como espera tu backend
    body: JSON.stringify({ mood: text, type: 'default' }) // <-- CAMBIO DE BODY
  });
  return r.json();
}
