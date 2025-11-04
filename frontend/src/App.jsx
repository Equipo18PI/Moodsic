import { useState } from 'react';
// import Login from './pages/Login.jsx'; // <-- CAMBIO 1 (Opcional): Ya no se usa
// import Register from './pages/Register.jsx'; // <-- CAMBIO 1 (Opcional): Ya no se usa
import Moods from './pages/Moods.jsx';

export default function App(){
  // const [token, setToken] = useState(localStorage.getItem('token')); // <-- CAMBIO 2: Ya no se necesita
  
  // CAMBIO 3: Forzamos que la vista inicial sea siempre 'moods'
  const [view, setView] = useState('moods'); 
  // const [view, setView] = useState(token ? 'moods' : 'login'); // <-- Línea original comentada

  // CAMBIO 4: Estas funciones de login/logout ya no se necesitan
  // const handleLogin = (tok) => { localStorage.setItem('token', tok); setToken(tok); setView('moods'); }
  // const handleLogout = () => { localStorage.removeItem('token'); setToken(null); setView('login'); }

  return (
    <div className="container">
      <h1>Moodsic 🎶</h1>
      <div style={{marginBottom:12}}>
        {/* CAMBIO 5: Borramos todos los botones de login/register */}
      </div>
      
      {/* CAMBIO 6: Borramos las vistas de login y register */}
      {/* {view==='login' && <Login onLogin={handleLogin} />} */}
      {/* {view==='register' && <Register onRegistered={()=>setView('login')} />} */}

      {/* CAMBIO 7: Mostramos SIEMPRE la vista 'moods' y le pasamos un token nulo */}
      {view==='moods' && <Moods token={null} />}
    </div>
  )
}