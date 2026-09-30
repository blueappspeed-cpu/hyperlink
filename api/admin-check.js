// api/admin-check.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const { passcode } = req.body || {};
  const real = process.env.ADMIN_PASSCODE;

  if (!real) {
    return res.status(500).json({ ok: false, error: 'No passcode configured' });
  }

  if (passcode === real) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false });
}
