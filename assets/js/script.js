$(document).ready(function () {
    // --- Enable tooltips (used for navbar icons) ---
    $('[data-toggle="tooltip"]').tooltip();

    // --- reacting to user input ---
    $("#outputAmount").click(function () {
        $("#status-display").text("Click on the Export-button to create events for Google Calendar.");
        toggleGoal("pages", "Number of pages", "#goalPg", "#goalDt");
    });
    $("#outputWhen").click(function () {
        $("#status-display").text("Note that iReadMore rounds up to full pages. Therefore, it's possible that the finish date is earlier than the date entered.");
        toggleGoal("date", "Date to be finished", "#goalDt", "#goalPg");
    });
    $('#bookTitle').on('input', function () {
        $("#bookTitle").popover("hide");
        if ($(this).val().length > 40) {
            $("#bookTitle").attr({"data-content": "Enter 1 - 40 characters", "data-placement": "bottom"}).popover("show");
        } else {
            savedData.books[savedData.currentBook].bookTitle = $(this).val();
            updateSummary();
        }
    });
    $('#totalPages').on('input', function () {
        savedData.books[savedData.currentBook].totalPages = Number($(this).val());
        delay.count();
    });
    $('#goalPg').on('input', function () {
        savedData.books[savedData.currentBook].goalPages = Number($(this).val());
        delay.count();
    });
    $('#goalDt').on('input', function () {
        savedData.books[savedData.currentBook].goalDate = $(this).val();
        delay.count();
    });
    $('#eventTime').on('input', function () {
        savedData.books[savedData.currentBook].readingTime = $(this).val();
        delay.count();
    });
    $('#eventLength').on('input', function () {
        savedData.books[savedData.currentBook].readingDuration = Number($(this).val());
        delay.count();
    });
    $('.dayCheck').click(function () {
        savedData.books[savedData.currentBook].weekdaySelected[$('.dayCheck').index(this)] = this.checked;
        $("#months").empty();
        delay.count();
    });
    $("#btn-print").click(function () {
        $("#input-section, #introduction, #months, header, footer, #print-title, #online-summary").hide();
        $("#print-introduction").show();
        window.print();
        $("#input-section, #introduction, #months, header, footer, #print-title, #online-summary").show();
        $("#print-introduction").hide();
    });
    $("#export-google").click(function() {
        $("#alertModal").modal();
        let eventsNumber = savedData.books[savedData.currentBook].readingDates.length;
        if (eventsNumber > 1) {
            $("#events-warning").text(`${eventsNumber} events`);
        } else {
            $("#events-warning").text("one event");
        }
    });

    // --- replacement for css style: html {scroll-behavior: smooth;} to work in all browsers ---
    $(".nav-link").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html").animate({
        scrollTop: $(hash).offset().top
      }, 400, function(){
        window.location.hash = hash;
      });
    }
  });

    // setting sample values, if there's no saved data. (Saving not implemented yet):
    let today = new Date();
    let initialBook = new UserInput(today, "Example", 300, 12, null, [true, true, true, true, true, true, true], "20:00", 60, "pages", null, []);
    savedData.add(initialBook);
});

function UserInput(startDate, bookTitle, totalPages, goalPages, goalDate, weekdaySelected, readingTime, readingDuration, goalType, endDate, readingDates) {
    this.startDate = startDate; //today's date when the object is created
    this.bookTitle = bookTitle;
    this.totalPages = totalPages;
    this.goalPages = goalPages;
    this.goalDate = goalDate;
    this.weekdaySelected = weekdaySelected; // array with 7 bool values
    this.readingTime = readingTime;
    this.readingDuration = readingDuration;
    this.goalType = goalType;
    this.endDate = endDate;
    this.readingDates = readingDates; // Array with dates, used for export and print
}

// --- object containing the book(s). Just one book, as long as saving data is not implemented ---
let savedData = {
    books: [],
    currentBook: 0,
    add: function (oneBook) {
        this.books.push(oneBook);
    }
};

let calendarLabels = {
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    allMonths: ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"]
};

// --- A delay after every user input, avoids updating the UI with every single keystroke ---
let delay = {
    timer: setTimeout(function () {
        countDays();
    }, 100),
    count: function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            $("#months").empty();
            if (savedData.books[savedData.currentBook].goalType == "pages") {
                countDays();
            } else {
                countPages();
            }
        }, 500);
    }
};

// --- is called when the reading goal is a number of pages ---
function countDays() {
    let totalPages = savedData.books[savedData.currentBook].totalPages;
    let goalPages = savedData.books[savedData.currentBook].goalPages;
    if (inputCheck(totalPages, goalPages)) {
        let result = Math.ceil(totalPages / goalPages);
        drawCalendar(result);
    }
}

// --- is called when the reading goal is a date ---
function countPages() {
    let totalPages = savedData.books[savedData.currentBook].totalPages;
    if (inputCheck(totalPages, 1)) {
        let goalSplit = savedData.books[savedData.currentBook].goalDate.split("-");
        let goalDate = new Date(goalSplit[0], goalSplit[1] - 1, goalSplit[2]);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (goalDate < today) {
            $("#goalDt").attr({"data-content": "The date cannot be in the past", "data-placement": "bottom"}).popover("show");
            goalDate = today;
        } else {
            $("#goalDt").popover("hide");
        }
        const oneDay = 1000 * 60 * 60 * 24;

        // Difference in milliseconds
        const differenceMs = Math.abs(goalDate - today);

        // Convert back to number of days
        let totalDays = Math.round(differenceMs / oneDay) + 1; //+1 because start and end date counts
        let result = 0;
        for (let i = 0; i < totalDays; i++) {
            if (savedData.books[savedData.currentBook].weekdaySelected[today.getDay()]) {
                result += 1;
            }
            today.setDate(today.getDate() + 1);
        }
        let numberOfPages = totalPages / result;
        roundedNumber = Math.ceil(numberOfPages);
        savedData.books[savedData.currentBook].goalPages = roundedNumber;

        // subtracting days when reading 0.n pages per day more
        discrepance = Math.round((1 - (numberOfPages - Math.floor(numberOfPages))) * result);
        if (discrepance > roundedNumber) {
            result -= Math.floor(Math.floor(discrepance) / roundedNumber);
        }
        drawCalendar(result);
    }
}

// --- Checking user input and displaying error message if appropriate ---
function inputCheck(totalPages, goalPages) {
    returnValue = true;
    $("#totalPages").popover("hide");
    $("#goalPg").popover("hide");
    $("#eventLength").popover("hide");
    if (totalPages > 5000 || totalPages < 1) {
        $("#totalPages").attr({"data-content": "Enter a number between 1 and 5000", "data-placement": "bottom"}).popover("show");
        returnValue = false;
    }
    if (goalPages > 5000 || goalPages < 1) {
        $("#goalPg").attr({"data-content": `Enter a number between 1 and ${totalPages}`, "data-placement": "bottom"}).popover("show");
        returnValue = false;
    }
    if (totalPages - Math.floor(totalPages) != 0) {
        $("#totalPages").attr({"data-content": "Enter an integer number", "data-placement": "bottom"}).popover("show");
        returnValue = false;
    }
    if (goalPages - Math.floor(goalPages) != 0) {
        $("#goalPg").attr({"data-content": "Enter an integer number", "data-placement": "bottom"}).popover("show");
        returnValue = false;
    }
    if (goalPages > totalPages && $("#goalPg").is(":focus")) {
        $("#goalPg").attr({"data-content": "Your goal is higher than the total number of pages", "data-placement": "bottom"}).popover("show");
        returnValue = false;
    }
    let length = savedData.books[savedData.currentBook].readingDuration;
    if (length > 360 || length < 10) {
        $("#eventLength").attr({"data-content": "Enter a number between 10 and 360", "data-placement": "bottom"}).popover("show");
        returnValue = false;
    }
    if (length - Math.floor(length) != 0) {
        $("#eventLength").attr({"data-content": "Enter an integer number", "data-placement": "bottom"}).popover("show");
        returnValue = false;
    }
    let dayChecked = $("input[type=checkbox]:checked").length;
    if(!dayChecked) {
        $("#summary").text("You need to select at least one weekday");
        savedData.books[savedData.currentBook].readingDates = [];
        returnValue = false;
    }
    return returnValue;
}

// --- creates the calendar in the calendar-section. Both table and print version ---
function drawCalendar(days) {
    let el = document.getElementById("months");
    let today = new Date();
    let timeSplit = savedData.books[savedData.currentBook].readingTime.split(":");
    today.setHours(timeSplit[0], timeSplit[1], 0);
    let dateAdder = resetDate();
    let loopCounter = 0;
    let monthLooper = 0;
    savedData.books[savedData.currentBook].readingDates = [];
    while (loopCounter < days) {
        dateAdder.setDate(1);
        dateAdder.setMonth(today.getMonth() + monthLooper);
        let displayThisMonth = dateAdder.getMonth();
        let checkForBreak = dateAdder.getFullYear() * 100 + displayThisMonth;
        let monthTitle = document.createElement("h3");
        monthTitle.textContent = (calendarLabels.allMonths[displayThisMonth] + " " + dateAdder.getFullYear());
        dateAdder.setDate(dateAdder.getDate() - dateAdder.getDay());
        let calendarMonthBg = document.createElement("div");
        calendarMonthBg.classList.add("calendar-bg");
        let tbl = document.createElement('table');
        tbl.classList.add("calendar-month");
        let tbdy = document.createElement('tbody');
        calendarMonthBg.appendChild(monthTitle);
        let hr = document.createElement('hr');
        calendarMonthBg.appendChild(hr);

        // building the rows:
        for (let i = 0; i < 7; i++) {
            if (dateAdder.getFullYear() * 100 + dateAdder.getMonth() > checkForBreak) {
                break;
            }
            let tr = document.createElement('tr');

            // building the columns
            for (let j = 0; j < 7; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);
                if (i == 0) { // create titles
                    td.innerText = calendarLabels.weekDays[j];
                    td.classList.add("week-day");
                } else {
                    td.innerText = dateAdder.getDate();
                    if (displayThisMonth != dateAdder.getMonth()) {
                        td.classList.add("cell-outside");
                    } else {
                        if (today <= dateAdder && savedData.books[savedData.currentBook].weekdaySelected[dateAdder.getDay()]) { // check that countdown starts today && if the weekday is selected
                            if (loopCounter < days) {
                                td.classList.add("cell-marked");
                                readDate = new Date(dateAdder);
                                savedData.books[savedData.currentBook].readingDates.push(readDate);
                            }
                            loopCounter += 1;

                            if (loopCounter == days) {
                                savedData.books[savedData.currentBook].endDate = `${dateAdder.getFullYear()}-${dateAdder.getMonth()}-${dateAdder.getDate()}`;
                                updateSummary();
                            }
                        }
                    }
                    dateAdder.setDate(dateAdder.getDate() + 1);
                }
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        calendarMonthBg.appendChild(tbl);
        el.appendChild(calendarMonthBg);
        dateAdder = resetDate();
        monthLooper += 1;
    }

    // Generate print schedule
    let pages = savedData.books[savedData.currentBook].goalPages;
    $("#print-table").empty();
    savedData.books[savedData.currentBook].readingDates.forEach(function (date, i) {
        let pagesRange = "";
        if (i == (savedData.books[savedData.currentBook].readingDates.length - 1)) {
            pagesRange = "Last pages";
        } else {
            pagesRange = `${pages * i} - ${pages * i + pages - 1}`;
        }
        $("#print-table").append(`
        <div class="row">
            <div class="col-8 col-md-3 col-padding">
                ${calendarLabels.weekDays[date.getDay()]}, ${calendarLabels.allMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}<br><hr>
            </div>
            <div class="col-4 col-md-2 col-padding">
                ${pagesRange}<br><hr>
            </div>
            <div class="d-none d-md-block col-md-1 col-padding">
                <i class="far fa-square"></i><br><hr>
            </div>
            <div class="d-none d-md-block col-md-6 col-padding">
                <br><hr>
            </div> 
        </div>
    `);
    });	
}

function resetDate() {
    let dateAdder = new Date();
    let timeSplit = savedData.books[savedData.currentBook].readingTime.split(":");
    dateAdder.setHours(timeSplit[0], timeSplit[1], 0);
    return dateAdder;
}

// --- creates (and updates) the summary for the screen and for the print version ---
function updateSummary() {
    let goalSplit = savedData.books[savedData.currentBook].endDate.split("-");
    $("#summary").text(`You will be finished reading "${
        savedData.books[savedData.currentBook].bookTitle}" on ${
        calendarLabels.allMonths[goalSplit[1]]} ${goalSplit[2]}, ${
        goalSplit[0]}, reading ${
        savedData.books[savedData.currentBook].goalPages} page(s) every time marked in the calendar below.`);
    $("#print-summary").html(`Reading Plan "${savedData.books[savedData.currentBook].bookTitle}"`);
}

// --- called when changing the reading goal (change of radio button) ---
function toggleGoal(goalType, label, show, hide) {
        $("#months, #print-table").empty();
        $("#inputMethod").text(label);
        $("#goalPg, #goalDt").val("");
        $(show).show();
        $(hide).hide();
        $("#summary").text("Please set a new reading goal");
        savedData.books[savedData.currentBook].goalType = goalType;
    }