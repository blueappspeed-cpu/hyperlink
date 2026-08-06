import db from "../lib/db.js";
import { randomUUID } from "crypto";

function generateCode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    code += chars[Math.floor(Math.random() * 26)];

    for (let i = 1; i < length; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { url, type } = req.body ?? {};

    if (!url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    let code = generateCode();

    while (await db.get(`link:${code}`)) {
        code = generateCode();
    }

    const link = {
        id: randomUUID(),
        code,
        url,
        type,
        createdAt: Date.now(),
        clicks: 0
    };

    await db.set(`link:${code}`, link);

    const history = (await db.get("history")) || [];

    history.unshift({
        code,
        url,
        shortUrl: `${req.headers.origin}/${code}`
    });

    await db.set("history", history.slice(0, 50));

    return res.status(200).json({
        success: true,
        code,
        shortUrl: `${req.headers.origin}/${code}`
    });
}
