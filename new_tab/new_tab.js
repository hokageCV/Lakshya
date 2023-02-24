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
    chrome.storage.local.get(["showQuote", "docTitle"]).then((data) => {
        // quote related
        if (data.showQuote) {
            changeElementDisplay(quoteDabba, "flex");
        } else {
            changeElementDisplay(quoteDabba, "none");
        }
        // title related
        document.title = data.docTitle;
    });

    displayHeadlineAndCalendar();
    fetchAndDisplayQuote();
});

// listening for user actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // quote related
    if (message.command === "show quote") {
        changeElementDisplay(quoteDabba, "flex");
    } else if (message.command === "hide quote") {
        changeElementDisplay(quoteDabba, "none");
    }
    // title related
    else if (message.command === "change title") {
        chrome.storage.local.get(["docTitle"]).then((data) => {
            document.title = data.docTitle;
        });
    }
});

// =====================
