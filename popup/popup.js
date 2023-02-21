const quoteCheckbox = document.getElementById("toggleQuote")

document.addEventListener("DOMContentLoaded", ()=>{
    const retrievedData = localStorage.getItem("showQuote")
    const data = JSON.parse(retrievedData)
    quoteCheckbox.checked = data.showQuote ?? true;
})

quoteCheckbox.addEventListener("change", ()=>{
    localStorage.setItem("showQuote", JSON.stringify({ showQuote: quoteCheckbox.checked }));

    const message = {
        type: quoteCheckbox.checked ? "show quote" : "hide quote" 
    };

    chrome.tabs.query({}, (tabs)=>{
        for(var i=0; i< tabs.length; i++){
            chrome.tabs.sendMessage(tabs[i].id, message, null, (response)=>{
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    return;
                  }
            });
        }
    })
})