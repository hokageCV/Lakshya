import { copyText } from "./copyAndNotify.js";
import { updateTaskInStorage } from "./utils.js";

const quote = document.getElementById("quote");
const task1 = document.getElementById("task1");
const task2 = document.getElementById("task2");
const task3 = document.getElementById("task3");

export const setUpEventListeners = () => {
  // quote
  quote.addEventListener("click", copyText);

  // tasks
  task1.addEventListener("input", () => {
    updateTaskInStorage("task1", task1.textContent);
  });

  task2.addEventListener("input", () => {
    updateTaskInStorage("task2", task2.textContent);
  });

  task3.addEventListener("input", () => {
    updateTaskInStorage("task3", task3.textContent);
  });
};
