import { displayHeadlineAndCalendar } from "./utils/calendar.js";
import { fetchAndDisplayQuote } from "./utils/quote.js";
import { changeElementDisplay } from "./utils/utils.js";
import { copyText } from "./utils/copyAndNotify.js";

const quoteDabba = document.getElementById("quoteDabba");
const quote = document.getElementById("quote");

// =====================
quote.addEventListener("click", copyText);

document.addEventListener("DOMContentLoaded", () => {
    // checking for initial render
    chrome.storage.local.get(["showQuote"]).then((data) => {
        if (data.showQuote) {
            changeElementDisplay(quoteDabba, "flex");
        } else {
            changeElementDisplay(quoteDabba, "none");
        }
    });

    displayHeadlineAndCalendar();
    fetchAndDisplayQuote();
});

// listening for user actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "show quote") {
        changeElementDisplay(quoteDabba, "flex");
    } else if (message.command === "hide quote") {
        changeElementDisplay(quoteDabba, "none");
    }
});

// =====================
