// api/maintenance.js
let maintenanceOn = process.env.MAINTENANCE_MODE === 'true';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ on: maintenanceOn });
  }
  if (req.method === 'POST') {
    const { on, passcode } = req.body || {};
    const expected = process.env.ADMIN_PASSCODE;
    if (!expected || passcode !== expected) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
    maintenanceOn = !!on;
    return res.status(200).json({ ok: true, on: maintenanceOn });
  }
  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
