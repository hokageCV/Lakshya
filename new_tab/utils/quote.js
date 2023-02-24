async function getQuote() {
    const API_URL = "https://api.quotable.io/random";

    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        return {
            quote: json.content,
            author: json.author,
        };
    } catch (err) {
        console.error("There was a problem with the fetch operation:", err);
    }
}

async function displayQuote(data) {
    const quote = document.getElementById("quote");
    const author = document.getElementById("author");

    quote.textContent = data.quote;
    author.textContent = `- ${data.author}`;
}

function storeQuote(quoteData) {
    chrome.storage.local
        .set({
            quoteData: {
                quote: quoteData.quote,
                author: quoteData.author,
                quoteDate: new Date().toString(),
            },
        })
        .then((data) => {
            console.log("quote saved");
        });
}

function isQuoteOlderThanToday(storedQuoteDate) {
    const storedDate = new Date(storedQuoteDate);

    const today = new Date();

    // return true if stored quote date is older than today
    return (
        storedDate.getFullYear() !== today.getFullYear() || // If year is different, quote is older
        storedDate.getMonth() !== today.getMonth() || // If month is different, quote is older
        storedDate.getDate() !== today.getDate() // If day is different, quote is older
    );
}

async function getStoredQuote() {
    const data = await chrome.storage.local.get(["quoteData"]);
    const storedQuote = data.quoteData?.quote;
    const storedAuthor = data.quoteData?.author;
    const storedQuoteDate = data.quoteData?.quoteDate;

    if (
        storedQuote &&
        storedAuthor &&
        storedQuoteDate &&
        !isQuoteOlderThanToday(storedQuoteDate)
    ) {
        return {
            quote: storedQuote,
            author: storedAuthor,
            quoteDate: storedQuoteDate,
        };
    } else {
        return null;
    }
}

export async function fetchAndDisplayQuote() {
    const storedQuoteData = await getStoredQuote();

    if (storedQuoteData && !isQuoteOlderThanToday(storedQuoteData.quoteDate)) {
        displayQuote(storedQuoteData);
    } else {
        const quoteData = await getQuote();
        storeQuote(quoteData);
        displayQuote(quoteData);
    }
}
