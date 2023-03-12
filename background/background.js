chrome.runtime.onInstalled.addListener(async (e) => {
  if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    await chrome.storage.local.set({ isOnboarded: false });
    await chrome.storage.local.set({ showQuote: true });

    await chrome.storage.local.set({ showTasks: true });
    await chrome.storage.local.set({
      tasks: {
        task1: "",
        task2: "",
        task3: "",
      },
    });

    await chrome.storage.local.set({ docTitle: "Blink" });

    chrome.tabs.create({
      url: "./background/onboard/onboard.html", //this path has to be relative to root directory
    });
  } else if (e.reason === "update") {
    console.log("Antauri Sprx! Gibson! Nova! Otto! REELOD!");
  }
});

// listening for shortcut key
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-showTasks-display") {
    chrome.storage.local.get("showTasks", (data) => {
      chrome.storage.local.set({ showTasks: !data.showTasks });
    });
  }
});
