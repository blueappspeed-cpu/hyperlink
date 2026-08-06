import { getFile, saveFile } from "../../lib/github.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).send("Method Not Allowed");
    }

    const { code } = req.query;

    const { sha, content } = await getFile();

    const link = content[code];

    if (!link) {
        return res.status(404).send("Link not found");
    }

    link.clicks = (link.clicks || 0) + 1;

    content[code] = link;

    await saveFile(content, sha);

    res.writeHead(302, {
        Location: link.url
    });

    res.end();
}
