console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener((e) => {
    if (e.reason === "install") {
        chrome.storage.local.set({ isOnboarded: false });
        chrome.storage.local.set({ showQuote: true });
    } else if (e.reason === "update") {
        console.log("Antauri Sprx! Gibson! Nova! Otto! REELOD!");
    }
});
