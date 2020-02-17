
$(document).ready(function() {	
	
	$("#outputAmount").click(function(){
		$("#inputMethod").text("Number of pages");
		$("#goal").attr("type", "number");
	})
	
	$("#outputWhen").click(function(){
		$("#inputMethod").text("Date finished");
		$("#goal").attr("type", "date");
	})
	
	$("#go-button").click(function(){   // has to change
		$("#result").fadeIn();
		$('html, body').animate({
           'scrollTop':   $('#scroll-here').offset().top
         }, 500);
    });

    let today = new Date();

    // setting sample values, if there's no saved data. (Saving not implemented yet):
    let initialBook = new UserInput(today, "Example", 500, 10, null, [true,true,true,true,true,true,true], today.getTime(), 30);
    savedData.add(initialBook);
});


function UserInput(startDate, bookTitle, totalPages, goalPages, goalDate, weekdaySelected, readingTime, readingDuration) {
	this.startDate = startDate; //today's date when the object is created
	this.bookTitle = bookTitle;
    this.totalPages = totalPages;
    this.goalPages = goalPages; // if option 1 was chosen, otherwise nil
    this.goalDate = goalDate; // if option 2 was chosen, otherwise nil
    this.weekdaySelected = weekdaySelected; // array with 7 bool values
    this.readingTime = readingTime;
    this.readingDuration = readingDuration;

	this.speak = function () {
		console.log(`vrooooooom!`);
	};
}

let savedData = {
    books: [],
    currentBook: 0,
	add: function(oneBook) {
        this.books.push(oneBook);
    }
};

$('#bookTitle').on('input', function() {
    savedData.books[savedData.currentBook].bookTitle = $(this).val();
});

$('#totalPages').on('input', function() {
    savedData.books[savedData.currentBook].totalPages = $(this).val();
    delay.countDays();
});

$('#goal').on('input', function() {
    savedData.books[savedData.currentBook].goalPages = $(this).val();
    delay.countDays();
});

$('.dayCheck').click(function () {
    savedData.books[savedData.currentBook].weekdaySelected[$('.dayCheck').index(this)] = this.checked;
    $("#months").empty();
    countDays();
});

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
        let checkOverflow = totalPages % goalPages;
        let result = parseInt(totalPages/goalPages);
        if (checkOverflow != 0) {
            result +=1;
        }
        drawCalendar(result);
    }
}

function drawCalendar(days) {
	let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let allMonths = ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"];
	let el = document.getElementById("months");
	let today = new Date();
    let dateAdder = new Date();
    let loopCounter = 0;
    let monthLooper = 0;
    while (loopCounter < days) {
		dateAdder.setDate(1);
		dateAdder.setMonth(today.getMonth() + monthLooper);
		let displayThisMonth = dateAdder.getUTCMonth();
		let checkForBreak = dateAdder.getUTCFullYear() * 100 + displayThisMonth
		let monthTitle = document.createElement("h3");
		monthTitle.textContent = (allMonths[displayThisMonth] + " " + dateAdder.getUTCFullYear());
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
				    td.innerText = weekDays[j];
                    td.style.fontWeight = "600";
			    } else {
				    td.innerText = dateAdder.getUTCDate();
				    if (displayThisMonth != dateAdder.getUTCMonth()) {
					    td.style.color = "#ccc";
				    } else {
                        if (savedData.books[savedData.currentBook].weekdaySelected[dateAdder.getDay()]) {
                            if (loopCounter < days) {
                             td.style.backgroundColor = "#ff3300";
                            }
                            loopCounter +=1;
                            if (loopCounter == days) {
                                $("#summary").text(`You will be finished reading "${
                                    savedData.books[savedData.currentBook].bookTitle}" on ${
                                    allMonths[dateAdder.getMonth()]} ${dateAdder.getDate()}, ${
                                    dateAdder.getUTCFullYear()}, reading ${
                                    savedData.books[savedData.currentBook].goalPages} page(s) every time marked in the calendar.`);
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