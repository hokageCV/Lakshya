import { changeElementDisplay } from "./utils.js";

export const renderDataInitially = () => {
  chrome.storage.local.get(["showQuote", "showTasks", "tasks", "docTitle"]).then((data) => {
    // quote related
    if (data.showQuote) {
      changeElementDisplay(quoteDabba, "flex");
    } else {
      changeElementDisplay(quoteDabba, "none");
    }

    // tasks related
    if (data.showTasks) {
      changeElementDisplay(tasksDabba, "block");
    } else {
      changeElementDisplay(tasksDabba, "none");
    }

    task1.textContent = data.tasks.task1;
    task2.textContent = data.tasks.task2;
    task3.textContent = data.tasks.task3;

    // title related
    document.title = data.docTitle;
  });
};
