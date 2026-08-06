import db from "../../lib/db.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).send("Method not allowed");
    }

    const { code } = req.query;

    try {
        const result = await db`
            SELECT id, url, clicks
            FROM links
            WHERE code = ${code}
            LIMIT 1
        `;

        if (result.length === 0) {
            return res.status(404).send("Link not found");
        }

        const link = result[0];

        await db`
            UPDATE links
            SET clicks = ${link.clicks + 1}
            WHERE id = ${link.id}
        `;

        return res.redirect(302, link.url);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
}
