console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener(async (e) => {
    console.log(e);
    if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        await chrome.storage.local.set({ isOnboarded: false });
        await chrome.storage.local.set({ showQuote: true });
        await chrome.storage.local.set({ docTitle: "Blink" });

        chrome.tabs.create({
            url: "./background/onboard/onboard.html", //this path has to be relative to root directory
        });
    } else if (e.reason === "update") {
        console.log("Antauri Sprx! Gibson! Nova! Otto! REELOD!");
    }
});
