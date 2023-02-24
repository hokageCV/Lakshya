document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("btn");

    btn.addEventListener("click", saveName);

    input.addEventListener("keydown", (e) => {
        let keyCode = e.code || e.key;
        if (keyCode === "Enter") {
            e.preventDefault();
            saveName();
        }
    });
});

const saveName = async () => {
    try {
        await chrome.storage.local.set({ userName: input.value });
        await chrome.storage.local.set({ isOnboarded: true });
        window.close();
        chrome.tabs.create({ url: "chrome://newtab" });
    } catch (err) {
        console.log(err);
    }
};
