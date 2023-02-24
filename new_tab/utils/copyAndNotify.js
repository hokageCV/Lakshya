export const copyText = () => {
    const cb = navigator.clipboard;
    cb.writeText(quote.innerText);

    showToast();
};

function showToast() {
    const toast = document.querySelector(".toast");
    const progress = document.querySelector(".progress");

    let timer1, timer2;

    toast.classList.remove("hidden");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        toast.classList.add("hidden");
    }, 5000);

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
}
