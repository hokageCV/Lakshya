const quoteCheckbox = document.getElementById("quoteCheckbox")

document.addEventListener("DOMContentLoaded", ()=>{
    chrome.storage.local.get(["showQuote"], (data)=>{
        if(data.showQuote){
            quoteCheckbox.checked = true
        }
        else{
            quoteCheckbox.checked = false
        }
    })
})

quoteCheckbox.addEventListener("change", ()=>{
    chrome.storage.local.set({showQuote: quoteCheckbox.checked})

    const message = {
        command: quoteCheckbox.checked ? "show quote" : "hide quote" 
    };

    chrome.tabs.query({}, (tabs)=>{
        for(let i=0; i< tabs.length; i++){
            chrome.tabs.sendMessage(tabs[i].id, message);
        }
    })
})