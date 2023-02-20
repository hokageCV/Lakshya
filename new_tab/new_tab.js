document.addEventListener("DOMContentLoaded", ()=>{
    displayCalendar()
    fetchAndDisplayQuote()
});
// ===============================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "show quote") {
      document.getElementById("quoteDabba").style.display = "flex";
      sendResponse({ result: " received : show quote" });
    } 
    else if (message.type === "hide quote") {
      document.getElementById("quoteDabba").style.display = "none";
      sendResponse({ result: " received : hide quote" });
    }
});

// ====

// chrome.runtime.onMessage.addListener((message, sender, sendResponse)=> {
//     console.log("message received in newtab.js :", message)
//     const quoteDabba = document.getElementById("quoteDabba")

//     if(message.type === "show quote"){
//         quoteDabba.style.display = "flex";
//     }
//     else if(message.type === "hide quote"){
//         quoteDabba.style.display = "none";
//     }
// });

// ===============================
function displayCalendar() {
    const calendar = document.getElementById("calendar");
    let today = new Date();

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ( isLeapYear( today.getFullYear() ) ) {
        daysInMonth[1] = 29;
    }

    for (let month = 0; month < 12; month++) {

        let monthContainer = document.createElement("div");
        monthContainer.className = "month";
    
        for (let day = 1; day <= daysInMonth[month]; day++) {

            let dayDate = new Date();
            dayDate.setFullYear(today.getFullYear());
            dayDate.setMonth(month);
            dayDate.setDate(day);

            let dot = document.createElement("div");
            dot.className = "dot";
            
            if (today.getTime() > dayDate.getTime()) {
                dot.classList.add("passed");
            }

            monthContainer.appendChild(dot);
        }
        calendar.appendChild(monthContainer);
    }
}
  
function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

// ===============================

async function getQuote(){
    const API_URL = 'https://api.quotable.io/random'; 

    try{
        const response = await fetch(API_URL);
        const json = await response.json()

        return {
            quote: json.content,
            author: json.author 
        }
    }
    catch(err){
        console.error('There was a problem with the fetch operation:', err);
    }
}

async function displayQuote(data){
    const quote = document.getElementById("quote");
    const author = document.getElementById("author");

    quote.textContent = data.quote;
    author.textContent  = data.author
}

function storeQuote(quoteData) {
    localStorage.setItem("quote", quoteData.quote);
    localStorage.setItem("author", quoteData.author);
    localStorage.setItem("quoteDate", new Date());
}

function isQuoteOlderThanToday(storedQuoteDate) {
    const storedDate = new Date(storedQuoteDate);
    const today = new Date();
    return (
        storedDate.getFullYear() !== today.getFullYear() ||
        storedDate.getMonth() !== today.getMonth() ||
        storedDate.getDate() !== today.getDate()
      );
}

function getStoredQuote() {
    const storedQuote = localStorage.getItem("quote");
    const storedAuthor = localStorage.getItem("author");
    const storedQuoteDate = localStorage.getItem("quoteDate");
  
    if (storedQuote && storedAuthor && storedQuoteDate && 
        !isQuoteOlderThanToday(storedQuoteDate)
    ) {
      return {
        quote: storedQuote,
        author: storedAuthor,
        quoteDate: storedQuoteDate
      };
    } 
    else {
      return null;
    }
}

async function fetchAndDisplayQuote() {
    const storedQuoteData = getStoredQuote();
    if (storedQuoteData) {
        displayQuote(storedQuoteData);
    } else {
        const quoteData = await getQuote();
        storeQuote(quoteData);
        displayQuote(quoteData);
    }
}