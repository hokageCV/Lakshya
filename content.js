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
            }

            monthContainer.appendChild(dot);
        }
    
        calendar.appendChild(monthContainer);
  }
}
  
function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
  
document.addEventListener("DOMContentLoaded", displayCalendar);