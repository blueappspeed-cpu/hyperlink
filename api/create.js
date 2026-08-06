import db from "../lib/db.js";
import { randomBytes } from "crypto";

function generateCode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const bytes = randomBytes(length);
    let code = "";

    code += chars[bytes[0] % 26];

    for (let i = 1; i < length; i++) {
        code += chars[bytes[i] % chars.length];
    }

    return code;
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { url, type } = req.body;

        if (!url) {
            return res.status(400).json({
                error: "URL required"
            });
        }

        let code;

        while (true) {
            code = generateCode();

            const exists = await db`
                SELECT id FROM links WHERE code = ${code}
            `;

            if (exists.length === 0) break;
        }

        await db`
            INSERT INTO links (
                code,
                url,
                type
            )
            VALUES (
                ${code},
                ${url},
                ${type || "Plain"}
            )
        `;

        const base =
            req.headers.origin ||
            `https://${req.headers.host}`;

        return res.status(200).json({
            success: true,
            code,
            shortUrl: `${base}/${code}`
        });

    } catch (error) {
        return res.status(500).json({
            error: "Server error"
        });
    }
}
