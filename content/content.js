// Inject before first paint — no scrollbar flash
const s = document.createElement("style");
s.id = "l-hide-scrollbar";
s.textContent =
  "html::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}";
document.documentElement.appendChild(s);

// Remove if user chose to show scrollbar
chrome.storage.local.get("hideScrollbar").then((r) => {
  if (!r.hideScrollbar) s.remove();
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.command === "hide scrollbar") addStyle();
  if (msg.command === "show scrollbar") removeStyle();
});

function addStyle() {
  if (document.getElementById("l-hide-scrollbar")) return;
  const el = document.createElement("style");
  el.id = "l-hide-scrollbar";
  el.textContent =
    "html::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}";
  document.documentElement.appendChild(el);
}

function removeStyle() {
  document.getElementById("l-hide-scrollbar")?.remove();
}
