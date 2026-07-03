const quoteCheckbox = document.getElementById("quoteCheckbox");
const tasksCheckbox = document.getElementById("tasksCheckbox");
const scrollbarCheckbox = document.getElementById("scrollbarCheckbox");
const titleInput = document.getElementById("titleInput");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["showQuote", "showTasks", "docTitle", "hideScrollbar"]).then((data) => {
    if (data.showQuote) {
      quoteCheckbox.checked = true;
    } else {
      quoteCheckbox.checked = false;
    }

    if (data.showTasks) {
      tasksCheckbox.checked = true;
    } else {
      tasksCheckbox.checked = false;
    }

    titleInput.placeholder = data?.docTitle;

    scrollbarCheckbox.checked = !!data.hideScrollbar;
  });
});

// =====================

quoteCheckbox.addEventListener("change", () => {
  chrome.storage.local.set({ showQuote: quoteCheckbox.checked }).then((data) => {
    console.log(data);
  });

  const message = {
    command: quoteCheckbox.checked ? "show quote" : "hide quote",
  };

  chrome.tabs.query({}, (tabs) => {
    tabs
      .filter((tab) => tab.url === "chrome://newtab/")
      .forEach((tab) => chrome.tabs.sendMessage(tab.id, message));
  });
});

// =====================

tasksCheckbox.addEventListener("change", () => {
  chrome.storage.local.set({ showTasks: tasksCheckbox.checked });

  const message = {
    command: tasksCheckbox.checked ? "show tasks" : "hide tasks",
  };

  chrome.tabs.query({}, (tabs) => {
    tabs
      .filter((tab) => tab.url === "chrome://newtab/")
      .forEach((tab) => chrome.tabs.sendMessage(tab.id, message));
  });
});

// =====================

scrollbarCheckbox.addEventListener("change", () => {
  const enabled = scrollbarCheckbox.checked;
  chrome.storage.local.set({ hideScrollbar: enabled });

  const css =
    "html::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}";

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      const target = { tabId: tab.id };
      if (enabled) {
        chrome.scripting.insertCSS({ target, css }).catch(() => {});
      } else {
        chrome.scripting.removeCSS({ target, css }).catch(() => {});
      }
      chrome.tabs.sendMessage(tab.id, {
        command: enabled ? "hide scrollbar" : "show scrollbar",
      }).catch(() => {});
    });
  });
});

// =====================

titleInput.addEventListener("keydown", async (e) => {
  // check if 'Enter' is pressed
  let keyCode = e.code || e.key;
  if (keyCode === "Enter") {
    e.preventDefault();

    if (titleExists(titleInput.value)) {
      await chrome.storage.local.set({ docTitle: `${titleInput.value}` });

      const message = {
        command: "change title",
      };

      chrome.tabs.query({}, (tabs) => {
        tabs
          .filter((tab) => tab.url === "chrome://newtab/")
          .forEach((tab) => chrome.tabs.sendMessage(tab.id, message));
      });

      titleInput.placeholder = titleInput.value;
      titleInput.value = "";
    }
  }
});

const titleExists = (str) => {
  if (str.trim() === "") {
    alert("Please enter a title.");
    return false;
  }
  return true;
};
