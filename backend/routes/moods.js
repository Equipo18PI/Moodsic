import express from 'express';
import axios from 'axios';
import { authMiddleware } from '../src/middleware/auth.js';
const router = express.Router();

router.post('/analyze', authMiddleware, async (req, res) => {
  const { text } = req.body;
  if(!text) return res.status(400).json({ error: 'No text provided' });
  try {
    const r = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that detects mood and suggests music genres and short playlist ideas.' },
        { role: 'user', content: `User text: ${text}` }
      ],
      max_tokens: 300
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });
    const out = r.data.choices?.[0]?.message?.content || 'No response';
    res.json({ mood: out });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'AI request failed' });
  }
});

export default router;
