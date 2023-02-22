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

export async function fetchAndDisplayQuote() {
    const storedQuoteData = getStoredQuote();
    if (storedQuoteData) {
        displayQuote(storedQuoteData);
    } else {
        const quoteData = await getQuote();
        storeQuote(quoteData);
        displayQuote(quoteData);
    }
}
