import cookie from 'cookie';
export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify'
  });
  const state = Math.random().toString(36).slice(2);
  res.setHeader('Set-Cookie', cookie.serialize('mortyx_state', state, {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 600
  }));
  res.redirect(302, 'https://discord.com/api/oauth2/authorize?' + params + '&state=' + state);
}
