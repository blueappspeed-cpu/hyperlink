import db from "../lib/db.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const links = await db`
            SELECT 
                code,
                url,
                type,
                clicks,
                created_at
            FROM links
            ORDER BY created_at DESC
            LIMIT 50
        `;

        const origin =
            req.headers.origin ||
            `https://${req.headers.host}`;

        const history = links.map(link => ({
            code: link.code,
            url: link.url,
            type: link.type,
            clicks: link.clicks,
            createdAt: link.created_at,
            shortUrl: `${origin}/${link.code}`
        }));

        return res.status(200).json(history);

    } catch (error) {
        return res.status(500).json({
            error: "Database error"
        });
    }
}
