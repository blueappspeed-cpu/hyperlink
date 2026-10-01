import cookie from 'cookie';
export default function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  try {
    if (cookies.mortyx_user) {
      const user = JSON.parse(Buffer.from(cookies.mortyx_user, 'base64').toString());
      return res.status(200).json({ signedIn: true, user });
    }
  } catch (e) {}
  return res.status(200).json({ signedIn: false });
}
