import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// Simple mock "AI" analyzer: keyword-based mood detection
function analyzeMood(text) {
  if (!text || !text.trim()) return { mood: "neutral", explanation: "No input provided." };
  const t = text.toLowerCase();
  const score = {
    joy: ["happy","joy","great","amazing","good","love","excited","energetic"],
    sad: ["sad","down","depressed","unhappy","sorrow","lonely","low"],
    angry: ["angry","mad","furious","annoyed","irritated"],
    calm: ["calm","relaxed","peaceful","chill","serene","content"],
    anxious: ["anxious","nervous","stressed","worried","panic"]
  };
  for (const m of Object.keys(score)) {
    for (const w of score[m]) {
      if (t.includes(w)) return { mood: m, explanation: `Detected keyword: '${w}'` };
    }
  }
  // fallback: neutral
  return { mood: "neutral", explanation: "Could not detect a strong emotion; returning neutral." };
}

app.post('/api/music/analyze', (req, res) => {
  const { text } = req.body;
  const analysis = analyzeMood(text);
  const suggestions = {
    joy: ["Don't Stop Me Now - Queen", "Happy - Pharrell Williams"],
    sad: ["Someone Like You - Adele", "Fix You - Coldplay"],
    angry: ["Killing In The Name - Rage Against The Machine", "Break Stuff - Limp Bizkit"],
    calm: ["Weightless - Marconi Union", "Clair de Lune - Debussy"],
    anxious: ["Breathe Me - Sia", "Holocene - Bon Iver"],
    neutral: ["Here Comes The Sun - The Beatles", "Everybody Wants To Rule The World - Tears for Fears"]
  };
  res.json({ success: true, analysis, recommendations: suggestions[analysis.mood] || suggestions.neutral });
});

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: "Moodsic backend (no-auth) running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Moodsic backend (no-auth) listening on ${PORT}`));
