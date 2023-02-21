document.addEventListener("DOMContentLoaded", ()=>{
    displayCalendar()
    fetchAndDisplayQuote()
});





// ===============================

let daysPassed = 0;

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
                daysPassed++;
            }

            monthContainer.appendChild(dot);
        }
        calendar.appendChild(monthContainer);
    }

    displayHeadline()
}
  
function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function displayHeadline(){
    const headLine = document.getElementById("headline")
    headLine.textContent = `${daysPassed} Days Have Passed This Year`
}

// ===============================

async function getQuote(){
    const API_URL = 'https://api.quotable.io/random'; 

    try{
        const response = await fetch(API_URL);
        const json = await response.json()
        console.log("🚀 ~ file: new_tab.js:93 ~ getQuote ~ json:", json)

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
    author.textContent  = `- ${data.author}`
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
