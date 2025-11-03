import { useState } from 'react';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Moods from './pages/Moods.jsx';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState(token ? 'moods' : 'login');

  const handleLogin = (tok) => { localStorage.setItem('token', tok); setToken(tok); setView('moods'); }
  const handleLogout = () => { localStorage.removeItem('token'); setToken(null); setView('login'); }

  return (
    <div className="container">
      <h1>Moodsic 🎶</h1>
      <div style={{marginBottom:12}}>
        {token ? <button onClick={handleLogout}>Logout</button> : null}
        {view==='login' && <button onClick={()=>setView('register')}>Register</button>}
        {view!=='login' && <button onClick={()=>setView('login')}>Login</button>}
      </div>
      {view==='login' && <Login onLogin={handleLogin} />}
      {view==='register' && <Register onRegistered={()=>setView('login')} />}
      {view==='moods' && <Moods token={token} />}
    </div>
  )
}
