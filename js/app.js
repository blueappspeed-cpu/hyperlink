import { createShortLink, getHistory } from "./api.js";
import {
    elements,
    initializeUI,
    bindEnter,
    getFormData,
    clearInput,
    showError,
    hideError,
    setLoading,
    showResult,
    renderHistory
} from "./ui.js";

import {
    isValidUrl,
    convertRobloxUrl,
    createMarkdown
} from "./utils.js";

async function loadHistory() {
    try {
        const history = await getHistory();
        renderHistory(history);
    } catch {
        renderHistory([]);
    }
}

async function shorten() {
    hideError();

    const { url, type } = getFormData();

    if (!url) {
        showError("Enter a URL.");
        return;
    }

    if (!isValidUrl(url)) {
        showError("Enter a valid URL.");
        return;
    }

    setLoading(true);

    try {
        const data = await createShortLink(url, type);

        const robloxUrl = convertRobloxUrl(url);

        const markdown = createMarkdown(
            robloxUrl,
            data.shortUrl
        );

        showResult({
            originalUrl: url,
            robloxUrl,
            shortUrl: data.shortUrl,
            markdown
        });

        clearInput();

        await loadHistory();
          } catch (error) {
        showError(error.message || "Unable to create short link.");
    } finally {
        setLoading(false);
    }
}

initializeUI();

bindEnter(shorten);

elements.shortenBtn.addEventListener("click", shorten);

loadHistory();
