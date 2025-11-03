import { useState } from 'react';
import { login } from '../api.js';
export default function Login({ onLogin }){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit = async (e)=>{
    e.preventDefault();
    const res = await login(email,password);
    if(res.token){ onLogin(res.token); } else { alert(res.error || 'Login failed'); }
  };
  return (
    <div className="card">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
