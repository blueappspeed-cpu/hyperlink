const API_BASE = "/api";

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || "Request failed");
    }

    return data;
}

export async function createShortLink(url, type) {
    return request("/create", {
        method: "POST",
        body: JSON.stringify({
            url,
            type
        })
    });
}

export async function getHistory() {
    return request("/history");
}

export async function getStats(code) {
    return request(`/stats/${code}`);
}

export async function deleteLink(code) {
    return request(`/delete/${code}`, {
        method: "DELETE"
    });
}
