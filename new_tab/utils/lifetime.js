const TOTAL_YEARS = 85;

export function drawConnectingLine() {
  const svg = document.getElementById("lifetimeLine");
  const container = document.querySelector(".container");
  if (!svg || !container) return;

  const currentDot = document.querySelector(".lifetime-dot.current");
  if (!currentDot) return;

  const target = document.getElementById("headline-year")
    || document.getElementById("headline")
    || document.getElementById("calendar");
  if (!target) return;

  const containerRect = container.getBoundingClientRect();
  const dotRect = currentDot.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const dotCx = dotRect.left - containerRect.left + dotRect.width / 2;
  const dotCy = dotRect.bottom - containerRect.top;

  const targetCx = targetRect.left - containerRect.left + targetRect.width / 2;
  const endY = targetRect.top - containerRect.top + 8;

  const pathD = `M ${dotCx} ${dotCy} C ${dotCx} ${dotCy + 30}, ${targetCx} ${endY - 30}, ${targetCx} ${endY}`;

  svg.innerHTML = `<path d="${pathD}" fill="none" stroke="var(--lifetimeCurrent)" stroke-width="1.5" stroke-opacity="0.3" stroke-linecap="round"/>`;
}

export const displayLifetime = () => {
  const lifetimeDabba = document.getElementById("lifetimeDabba");

  chrome.storage.local.get(["birthYear", "showLifetime"]).then((data) => {
    if (!data.showLifetime) {
      lifetimeDabba.style.display = "none";
      return;
    }
    lifetimeDabba.style.display = "block";
    lifetimeDabba.innerHTML = "";

    const birthYear = data.birthYear || new Date().getFullYear() - 25;
    const age = Math.min(Math.max(new Date().getFullYear() - birthYear, 0), TOTAL_YEARS - 1);

    const grid = document.createElement("div");
    grid.className = "lifetime-grid";

    let decade = null;
    for (let year = 0; year < TOTAL_YEARS; year++) {
      if (year % 10 === 0) {
        decade = document.createElement("div");
        decade.className = "lifetime-decade";
        grid.appendChild(decade);
      }
      const dot = document.createElement("div");
      dot.className = "lifetime-dot";
      if (year < age) {
        dot.classList.add("passed");
      } else if (year === age) {
        dot.classList.add("current");
      }
      decade.appendChild(dot);
    }
    lifetimeDabba.appendChild(grid);

    requestAnimationFrame(() => {
      drawConnectingLine();
    });
  });
};
