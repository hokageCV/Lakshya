import { displayHeadlineAndCalendar } from "./caldendar.js";
import { fetchAndDisplayQuote } from "./quote.js";


document.addEventListener("DOMContentLoaded", ()=>{
    displayHeadlineAndCalendar()
    fetchAndDisplayQuote()
});
