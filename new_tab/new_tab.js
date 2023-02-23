import { displayHeadlineAndCalendar } from "./calendar.js";
import { fetchAndDisplayQuote } from "./quote.js";
import { changeElementDisplay, copyText } from "./utils.js";

const quoteDabba = document.getElementById("quoteDabba");
const quote = document.getElementById("quote");

// =====================
quote.addEventListener("click", copyText);

// =====================

document.addEventListener("DOMContentLoaded", () => {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "show quote") {
        changeElementDisplay(quoteDabba, "flex");
    } else if (message.command === "hide quote") {
        changeElementDisplay(quoteDabba, "none");
    }
});

// =====================
