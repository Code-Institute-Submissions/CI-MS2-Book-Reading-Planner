
$(document).ready(function() {

    // ------------------------------------------------ reacting to user input:
	$("#outputAmount").click(function(){
		$("#inputMethod").text("Number of pages");
        $("#goalPg").removeClass("visOff").addClass("visOn");
        $("#goalDt").removeClass("visOn").addClass("visOff");
        $("#warningDescrepency").removeClass("visOn").addClass("visOff");
        savedData.books[savedData.currentBook].goalType = "pages";
	});
	
	$("#outputWhen").click(function(){
		$("#inputMethod").text("Date finished");
        $("#goalDt").removeClass("visOff").addClass("visOn");
        $("#goalPg").removeClass("visOn").addClass("visOff");
        $("#warningDescrepency").removeClass("visOff").addClass("visOn");
        savedData.books[savedData.currentBook].goalType = "date";
    });
    
    $('#bookTitle').on('input', function() {
        savedData.books[savedData.currentBook].bookTitle = $(this).val();
        updateSummary();
    });

    $('#totalPages').on('input', function() {
        savedData.books[savedData.currentBook].totalPages = $(this).val();
        if (savedData.books[savedData.currentBook].goalType == "pages") {
            delay.countDays();
        } else {
            delay.countPages();
        }
    });

    $('#goalPg').on('input', function() {
        savedData.books[savedData.currentBook].goalPages = $(this).val();
        delay.countDays();
    });

    $('#goalDt').on('input', function() {
        savedData.books[savedData.currentBook].goalDate = $(this).val();
        delay.countPages();
    });

    $('#eventTime').on('input', function() {
        savedData.books[savedData.currentBook].readingTime = $(this).val();
    });

    $('#eventLength').on('input', function() {
        savedData.books[savedData.currentBook].readingDuration = $(this).val();        
    });

    $('.dayCheck').click(function () {
        savedData.books[savedData.currentBook].weekdaySelected[$('.dayCheck').index(this)] = this.checked;
        $("#months").empty();
        if (savedData.books[savedData.currentBook].goalType == "pages") {
            delay.countDays();
        } else {
            delay.countPages();
        }
    });

    $("#print-view").click(function() {

        var printView = window.open("../../print.html", '_blank');
        if (printView) {
            //Browser has allowed it to be opened
            printView.focus();
            printView.document.write('<h3>dfldkfdf</h3>');
            //printView.document.section.innerText = "yellow";



            
            
            //let introduction = printView.document.getElementById("print-introduction");
            //introduction.style.background = "yellow";


        } else {
            //Browser has blocked it
            alert("Please disable the popup blocker in the browser settings.");
        }
    });

    // setting sample values, if there's no saved data. (Saving not implemented yet):
    let today = new Date();
    let initialBook = new UserInput(today, "Example", 500, 10, null, [true,true,true,true,true,true,true], "22:00", 60, "pages", null, []);
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
    this.readingDates = readingDates; // Array with dates, used for export to Google calendar
}

let savedData = {
    books: [],
    currentBook: 0,
	add: function(oneBook) {
        this.books.push(oneBook);
    }
};

let calendarLabels = {
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	allMonths: ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"]
}

let delay = {
    timer: setTimeout(function() {
        countDays();
    }, 100),
    countDays: function() {
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            $("#months").empty();
            countDays();
        }, 500);
    },
    countPages: function() {
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            $("#months").empty();
            countPages();
        }, 500);
    }
}

function countDays() {
    let totalPages = savedData.books[savedData.currentBook].totalPages;
    let goalPages = savedData.books[savedData.currentBook].goalPages;

    if ((totalPages + goalPages) - Math.floor(totalPages + goalPages) != 0) {
        alert("Error! please enter integer number");
    } else if (totalPages > 5000 || goalPages > 5000) {
        alert("Error! Don't enter more than 5000 pages");
    } else if (totalPages < 1 || goalPages < 1) {
        alert("Error! Value must not be smaller than 1");
    } else {
        let result = Math.ceil(totalPages/goalPages);
        drawCalendar(result);
    }
}

function countPages() {
    let totalPages = savedData.books[savedData.currentBook].totalPages;
    let goalSplit = savedData.books[savedData.currentBook].goalDate.split("-");
    let goalDate = new Date(goalSplit[0], goalSplit[1] - 1, goalSplit[2]); 
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (goalDate < today) {
        alert("Error! The date must not be in the past");
    }
    const oneDay = 1000 * 60 * 60 * 24;

    // Difference in milliseconds
    const differenceMs = Math.abs(goalDate - today);

    // Convert back to number of days
    let totalDays = Math.round(differenceMs / oneDay) + 1; //+1 because start and end date counts
    let result = 0;
    for (let i = 0; i < totalDays; i++) {
        if (savedData.books[savedData.currentBook].weekdaySelected[today.getDay()]) {
            result +=1;
        }
        today.setDate(today.getDate() + 1);
    }
    let numberOfPages = totalPages / result;
    roundedNumber = Math.ceil(numberOfPages);
    savedData.books[savedData.currentBook].goalPages = roundedNumber;

    // ********** subtracting days when reading 0.x pages per day more
    discrepance = Math.round((1 - (numberOfPages - Math.floor(numberOfPages))) * result)
    if (discrepance > roundedNumber) {
        result -= Math.floor(Math.floor(discrepance)/roundedNumber);
    }

    drawCalendar(result);
}

function drawCalendar(days) {
	let el = document.getElementById("months");
	let today = new Date();
    let dateAdder = new Date();
    let loopCounter = 0;
    let monthLooper = 0;
    savedData.books[savedData.currentBook].readingDates = [];
    while (loopCounter < days) {
		dateAdder.setDate(1);
		dateAdder.setMonth(today.getMonth() + monthLooper);
		let displayThisMonth = dateAdder.getMonth();
		let checkForBreak = dateAdder.getFullYear() * 100 + displayThisMonth
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
	
		// ************* building the rows:
    	for (let i = 0; i < 7; i++) {
		    if (dateAdder.getFullYear() * 100 + dateAdder.getMonth() > checkForBreak) {
				break;
			}
            let tr = document.createElement('tr');
            
		    // *************** building the columns
    	    for (let j = 0; j < 7; j++) {
                let td = document.createElement('td');
        	    tr.appendChild(td)
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
                            loopCounter +=1;
                            
                            if (loopCounter == days) {
                                 savedData.books[savedData.currentBook].endDate = `${dateAdder.getFullYear()}-${dateAdder.getMonth()}-${dateAdder.getDate()}`;
                                //savedData.books[savedData.currentBook].goalDate = dateAdder; --> Saving it as adate instead of a string
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
  	    calendarMonthBg.appendChild(tbl)
  	    el.appendChild(calendarMonthBg)
        dateAdder = new Date();
        monthLooper +=1;
    }
}

function updateSummary() {
    let goalSplit = savedData.books[savedData.currentBook].endDate.split("-");
    $("#summary").text(`You will be finished reading "${
    savedData.books[savedData.currentBook].bookTitle}" on ${
    calendarLabels.allMonths[goalSplit[1]]} ${goalSplit[2]}, ${
    goalSplit[0]}, reading ${
    savedData.books[savedData.currentBook].goalPages} page(s) every time marked in the calendar.`);
}