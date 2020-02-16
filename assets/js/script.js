
$(document).ready(function() {	
	
	$("#outputAmount").click(function(){
		$("#inputMethod").text("Number of pages");
		$("#goal").attr("type", "number");
	})
	
	$("#outputWhen").click(function(){
		$("#inputMethod").text("Date finished");
		$("#goal").attr("type", "date");
	})
	
	$("#go-button").click(function(){
		$("#result").fadeIn();
		$('html, body').animate({
           'scrollTop':   $('#scroll-here').offset().top
         }, 500);
    });
    
    drawCalendar();

    let today = new Date();
    let initialBook = new UserInput(today, "Example", 500, 20, null, [true,true,true,true,true,true,true], today.getTime(), 30);
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
});

$('#goal').on('input', function() {
    savedData.books[savedData.currentBook].goalPages = $(this).val();
});

$('.dayCheck').click(function () {
    savedData.books[savedData.currentBook].weekdaySelected[$('.dayCheck').index(this)] = this.checked;
});




function drawCalendar() {
	let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let allMonths = ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"];
	
	let el = document.getElementById("months");
	let today = new Date();
	let dateAdder = new Date();
	
	for (let k = 0; k < 3; k++) { // starting // Add a month with every time it loops
		dateAdder.setDate(1);
		dateAdder.setMonth(today.getMonth() +  k);
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
                //td.style.color = "#c4bbaf";
			} else {
				td.innerText = dateAdder.getUTCDate();
				if (displayThisMonth != dateAdder.getUTCMonth()) {
					td.style.color = "#ccc";
				} else {

                    //td.style.backgroundColor = "#c4bbaf";
                    //td.style.color = "white";
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
	//
	
	
	} // finishing repeating loop
	
}