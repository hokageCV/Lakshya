//this way, we get better error messages

try {
    importScripts("./background.js");
} catch (e) {
    console.error("yeh error aa raha hai :", e);
}