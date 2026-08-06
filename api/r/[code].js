import db from "../../lib/db.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).send("Method Not Allowed");
    }

    const { code } = req.query;

    const link = await db.get(`link:${code}`);

    if (!link) {
        return res.status(404).send("Link not found");
    }

    link.clicks = (link.clicks || 0) + 1;

    await db.set(`link:${code}`, link);

    return res.redirect(302, link.url);
}
