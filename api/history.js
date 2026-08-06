import db from "../lib/db.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const history = await db.get("history");

    return res.status(200).json(history || []);
}
