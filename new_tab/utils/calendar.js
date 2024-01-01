let daysPassed = 0;

function displayCalendar() {
    const calendar = document.getElementById("calendar");
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const year = today.getFullYear();

    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isLeapYear(today.getFullYear())) {
        monthDays[1] = 29;
    }

    for (const month in monthDays) {
        let monthContainer = document.createElement("div");
        monthContainer.className = `month`;

        const fragment = document.createDocumentFragment();

        for (let day = 1; day <= monthDays[month]; day++) {
            let dayDate = new Date(year, month, day);

            let dot = document.createElement("div");
            dot.className = `dot`;

            if (today.getTime() > dayDate.getTime()) {
                dot.classList.add("passed");
                daysPassed++;
            }
            fragment.appendChild(dot);
        }
        monthContainer.appendChild(fragment);
        calendar.appendChild(monthContainer);
    }

    displayHeadline()
}


function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function displayHeadline() {
  const headLine = document.getElementById("headline");

  chrome.storage.local.get(["userName"]).then((data) => {
    const name = data.userName;
    const userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    headLine.textContent = `${userName}, ${daysPassed} day${daysPassed !== 1 ? 's' : ''} have passed this year`;
  });
}

export function displayHeadlineAndCalendar() {
  displayCalendar();
  displayHeadline();
}
