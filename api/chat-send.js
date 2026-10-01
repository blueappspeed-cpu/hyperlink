import Pusher from 'pusher';
import cookie from 'cookie';
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});
const recentByUser = new Map();
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  // Read Discord user from signed cookie
  const cookies = cookie.parse(req.headers.cookie || '');
  let user = null;
  try {
    if (cookies.mortyx_user) user = JSON.parse(Buffer.from(cookies.mortyx_user, 'base64').toString());
  } catch (e) {}
  if (!user || !user.username) return res.status(401).json({ error: 'Not signed in' });

  const { text } = req.body || {};
  if (!text || typeof text !== 'string' || text.length > 200) return res.status(400).json({ error: 'Bad message' });

  const key = user.id;
  const now = Date.now();
  if (now - (recentByUser.get(key) || 0) < 1000) return res.status(429).json({ error: 'Slow down' });
  recentByUser.set(key, now);

  await pusher.trigger('global-chat', 'new-message', {
    user: user.username,
    avatar: user.avatar,
    text: String(text).slice(0, 200),
    time: Date.now()
  });
  return res.status(200).json({ ok: true });
}
