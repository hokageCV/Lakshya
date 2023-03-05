export const changeElementDisplay = (element, newDisplay) => {
    element.style.display = newDisplay;
};


export const updateTaskInStorage= (taskName, taskValue)=> {
    chrome.storage.local.get(["tasks"], (result) => {
      result.tasks[taskName] = taskValue;
      chrome.storage.local.set({ tasks: result.tasks });
    });
  }