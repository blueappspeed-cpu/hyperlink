import cookie from 'cookie';
export default function handler(req, res) {
  res.setHeader('Set-Cookie', cookie.serialize('mortyx_user', '', { maxAge: 0, path: '/' }));
  res.redirect(302, '/');
}
