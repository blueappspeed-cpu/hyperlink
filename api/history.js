import { getFile } from "../lib/github.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { content } = await getFile();

    const history = Object.entries(content)
        .map(([code, data]) => ({
            code,
            url: data.url,
            type: data.type,
            clicks: data.clicks,
            createdAt: data.createdAt
        }))
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 50)
        .map(link => ({
            ...link,
            shortUrl: `${req.headers.origin || `https://${req.headers.host}`}/${link.code}`
        }));

    return res.status(200).json(history);
}
