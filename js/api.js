const API = "/api";

export async function createShortLink(url, type) {
    const response = await fetch(`${API}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url,
            type
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create link");
    }

    return data;
}

export async function getHistory() {
    const response = await fetch(`${API}/history`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to load history");
    }

    return data;
}
