const API_URL = window.__API_URL__ || 'http://localhost:5000/api';

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
  const r = await fetch(`${API_URL}/moods/analyze`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });
  return r.json();
}
