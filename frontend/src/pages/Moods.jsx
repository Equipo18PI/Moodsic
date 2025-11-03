import { useState } from 'react';
import { analyze } from '../api.js';
export default function Moods({ token }){
  const [text,setText]=useState(''); const [result,setResult]=useState('');
  const go = async ()=> {
    const r = await analyze(text, token);
    setResult(r.mood || r.error || 'No response');
  };
  return (
    <div className="card">
      <h3>Describe your mood</h3>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6}></textarea>
      <button onClick={go}>Analyze</button>
      {result && <div style={{marginTop:12}}><strong>AI says:</strong><p>{result}</p></div>}
    </div>
  )
}
