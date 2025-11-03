import { useState } from 'react';
import { register } from '../api.js';
export default function Register({ onRegistered }){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit = async (e)=>{
    e.preventDefault();
    await register(name,email,password);
    alert('Registered, please login');
    onRegistered();
  };
  return (
    <div className="card">
      <h3>Register</h3>
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
