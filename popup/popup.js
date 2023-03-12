const quoteCheckbox = document.getElementById("quoteCheckbox");
const tasksCheckbox = document.getElementById("tasksCheckbox");
const titleInput = document.getElementById("titleInput");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["showQuote", "showTasks", "docTitle"]).then((data) => {
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
