document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const btn = document.getElementById("btn");

    btn.addEventListener("click", async () => {
        try {
            await chrome.storage.local.set({ userName: input.value });
            await chrome.storage.local.set({ isOnboarded: true });
            window.close();
        } catch (err) {
            console.log(err);
        }
    });
});
