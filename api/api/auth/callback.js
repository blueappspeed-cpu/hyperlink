import cookie from 'cookie';
export default async function handler(req, res) {
  const { code, state } = req.query;
  const cookies = cookie.parse(req.headers.cookie || '');
  if (!code) return res.status(400).send('Missing code');
  if (!state || state !== cookies.mortyx_state) return res.status(400).send('Bad state');

  // Exchange code for token
  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI
    })
  });
  const token = await tokenRes.json();
  if (!token.access_token) return res.status(400).send('Token exchange failed');

  // Get user
  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });
  const user = await userRes.json();
  if (!user.id) return res.status(400).send('User fetch failed');

  // Store user (simplified — base64 cookie; swap for a JWT in production)
  const payload = Buffer.from(JSON.stringify({
    id: user.id,
    username: user.username,
    global_name: user.global_name || user.username,
    avatar: user.avatar
  })).toString('base64');

  res.setHeader('Set-Cookie', [
    cookie.serialize('mortyx_user', payload, {
      httpOnly: false, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30
    }),
    cookie.serialize('mortyx_state', '', { maxAge: 0, path: '/' })
  ]);
  res.redirect(302, '/?login=success');
}
