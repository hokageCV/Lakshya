console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener((e) => {
    chrome.storage.local.set({ isOnboarded: false });
    if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.storage.local.set({ showQuote: true });

        chrome.tabs.create({
            url: "./background/onboard/onboard.html", //this path has to be relative to root directory
        });
    } else if (e.reason === "update") {
        console.log("Antauri Sprx! Gibson! Nova! Otto! REELOD!");
    }
});
