export function isValidUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

export function convertRobloxUrl(url) {
    try {
        const parsed = new URL(url);
        parsed.hostname = "www.roblox.com";
        return parsed.toString();
    } catch {
        return url;
    }
}

export function escapeMarkdownUrl(url) {
    return url.replace(/^https?:\/\//, "https_:_//");
}

export function createMarkdown(original, shortUrl) {
    return `[${escapeMarkdownUrl(original)}](${shortUrl})`;
}

export async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();

        let copied = false;

        try {
            copied = document.execCommand("copy");
        } catch {}

        textarea.remove();

        return copied;
    }
}

export function setButtonCopied(button) {
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Copied";

    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1200);
}

export function randomCode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    code += chars[Math.floor(Math.random() * 26)];

    for (let i = 1; i < length; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
}
