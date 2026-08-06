const API = "https://api.github.com";

const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json"
};

const path = "database/links.json";

async function getFile() {
    const response = await fetch(
        `${API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${path}?ref=${process.env.GITHUB_BRANCH}`,
        {
            headers
        }
    );

    if (!response.ok) {
        throw new Error("Unable to read database.");
    }

    const file = await response.json();

    const content = JSON.parse(
        Buffer.from(file.content, "base64").toString("utf8")
    );

    return {
        sha: file.sha,
        content
    };
}

async function saveFile(content, sha) {
    const response = await fetch(
        `${API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${path}`,
        {
            method: "PUT",
            headers,
            body: JSON.stringify({
                message: "Update links database",
                content: Buffer.from(
                    JSON.stringify(content, null, 2)
                ).toString("base64"),
                sha,
                branch: process.env.GITHUB_BRANCH
            })
        }
    );

    if (!response.ok) {
        throw new Error("Unable to save database.");
    }

    return response.json();
}

export {
    getFile,
    saveFile
};
