import { copyText, setButtonCopied } from "./utils.js";

export const elements = {
    tutorialBtn: document.getElementById("tutorialBtn"),
    closeTutorial: document.getElementById("closeTutorial"),
    tutorialModal: document.getElementById("tutorialModal"),

    urlInput: document.getElementById("urlInput"),
    linkType: document.getElementById("linkType"),
    shortenBtn: document.getElementById("shortenBtn"),

    error: document.getElementById("error"),

    resultSection: document.getElementById("resultSection"),
    shortLink: document.getElementById("shortLink"),
    copyShortBtn: document.getElementById("copyShortBtn"),

    markdownSection: document.getElementById("markdownSection"),
    markdownText: document.getElementById("markdownText"),
    copyMarkdownBtn: document.getElementById("copyMarkdownBtn"),

    linksSection: document.getElementById("linksSection"),
    originalText: document.getElementById("originalText"),
    robloxText: document.getElementById("robloxText"),
    shortText: document.getElementById("shortText"),

    historyList: document.getElementById("historyList")
};

export function showError(message) {
    elements.error.textContent = message;
    elements.error.classList.remove("hidden");
}

export function hideError() {
    elements.error.textContent = "";
    elements.error.classList.add("hidden");
}

export function setLoading(state) {
    elements.shortenBtn.disabled = state;
    elements.shortenBtn.textContent = state ? "Creating..." : "Shorten";
}

export function showResult({
    originalUrl,
    robloxUrl,
    shortUrl,
    markdown
}) {
    elements.resultSection.classList.remove("hidden");
    elements.markdownSection.classList.remove("hidden");
    elements.linksSection.classList.remove("hidden");

    elements.shortLink.href = shortUrl;
    elements.shortLink.textContent = shortUrl;

    elements.originalText.textContent = originalUrl;
    elements.robloxText.textContent = robloxUrl;
    elements.shortText.textContent = shortUrl;

    elements.markdownText.textContent = markdown;
}

export function clearResult() {
    elements.resultSection.classList.add("hidden");
    elements.markdownSection.classList.add("hidden");
    elements.linksSection.classList.add("hidden");

    elements.shortLink.textContent = "";
    elements.shortLink.removeAttribute("href");

    elements.originalText.textContent = "";
    elements.robloxText.textContent = "";
    elements.shortText.textContent = "";
    elements.markdownText.textContent = "";
}

export function renderHistory(items) {
    elements.historyList.innerHTML = "";

    if (!items || items.length === 0) {
        const empty = document.createElement("div");
        empty.className = "history-item";
        empty.textContent = "No links yet";
        elements.historyList.appendChild(empty);
        return;
    }

    items.forEach(item => {
        const row = document.createElement("div");
        row.className = "history-item";

        const left = document.createElement("span");
        left.textContent = item.url;

        const right = document.createElement("a");
        right.href = item.shortUrl;
        right.target = "_blank";
        right.rel = "noopener";
        right.textContent = item.shortUrl;

        row.append(left, right);
        elements.historyList.appendChild(row);
    });
}
export function bindCopyButtons() {
    elements.copyShortBtn.addEventListener("click", async () => {
        if (!elements.shortLink.textContent) return;

        const copied = await copyText(elements.shortLink.textContent);

        if (copied) {
            setButtonCopied(elements.copyShortBtn);
        }
    });

    elements.copyMarkdownBtn.addEventListener("click", async () => {
        if (!elements.markdownText.textContent) return;

        const copied = await copyText(elements.markdownText.textContent);

        if (copied) {
            setButtonCopied(elements.copyMarkdownBtn);
        }
    });

    document.querySelectorAll("[data-copy]").forEach(button => {
        button.addEventListener("click", async () => {
            const target = document.getElementById(button.dataset.copy);

            if (!target) return;

            const copied = await copyText(target.textContent);

            if (copied) {
                setButtonCopied(button);
            }
        });
    });
}

export function bindTutorial() {
    elements.tutorialBtn.addEventListener("click", () => {
        elements.tutorialModal.classList.remove("hidden");
    });

    elements.closeTutorial.addEventListener("click", () => {
        elements.tutorialModal.classList.add("hidden");
    });

    elements.tutorialModal.addEventListener("click", event => {
        if (event.target === elements.tutorialModal) {
            elements.tutorialModal.classList.add("hidden");
        }
    });
}

export function bindEnter(callback) {
    elements.urlInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            callback();
        }
    });
}

export function getFormData() {
    return {
        url: elements.urlInput.value.trim(),
        type: elements.linkType.value
    };
}

export function clearInput() {
    elements.urlInput.value = "";
    elements.urlInput.focus();
}

export function initializeUI() {
    bindCopyButtons();
    bindTutorial();
}
