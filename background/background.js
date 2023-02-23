console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener((e) => {
    console.log( e );
    if (e.reason === "install") {
        chrome.storage.local.set({isOnboarded: false})
        chrome.storage.local.set({showQuote: true});
    }
    else if(e.reason === "update"){
        console.log( "RELOOOOOD" );
    }
})

