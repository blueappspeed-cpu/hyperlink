import Pusher from 'pusher';
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { socket_id, channel_name } = req.body || {};
  if (!socket_id || channel_name !== 'global-chat') return res.status(403).json({ error: 'Denied' });
  return res.status(200).json(pusher.authorizeChannel(socket_id, channel_name));
}
