import { randomBytes } from "crypto";
import { getFile, saveFile } from "../lib/github.js";

function generateCode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    code += chars[Math.floor(Math.random() * 26)];

    const bytes = randomBytes(length - 1);

    for (let i = 0; i < bytes.length; i++) {
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

    const { url, type } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "Missing URL"
        });
    }

    const { sha, content } = await getFile();

    let code;

    do {
        code = generateCode();
    } while (content[code]);

    content[code] = {
        url,
        type,
        clicks: 0,
        createdAt: Date.now()
    };

    await saveFile(content, sha);

    const origin =
        req.headers.origin ||
        `https://${req.headers.host}`;

    return res.status(200).json({
        success: true,
        code,
        shortUrl: `${origin}/${code}`
    });
}
