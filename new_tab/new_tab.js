import { displayHeadlineAndCalendar } from "./calendar.js";
import { fetchAndDisplayQuote } from "./quote.js";
import { changeElementDisplay } from "../utils/utils.js";

const quoteDabba = document.getElementById("quoteDabba");

document.addEventListener("DOMContentLoaded", ()=>{
  chrome.storage.local.get(["showQuote"], (data)=>{
    if(data.showQuote){
        changeElementDisplay(quoteDabba, "flex")
    }
    else{
      changeElementDisplay(quoteDabba, "none")
    }
  })

  displayHeadlineAndCalendar()
  fetchAndDisplayQuote()
});
    
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "show quote") {
    changeElementDisplay(quoteDabba, "flex")
  } 
  else if (message.command === "hide quote") {
    changeElementDisplay(quoteDabba, "none")
  }
});
