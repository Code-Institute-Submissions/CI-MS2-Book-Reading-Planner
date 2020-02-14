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
});

function drawCalendar() {
	let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let allMonths = ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"];
	
	let el = document.getElementById("months");
	let today = new Date();
	let dateAdder = new Date();
	
	for (let k = 0; k < 40; k++) { // starting // Add a month with every time it loops
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
	
		// ************* building the rows:
  	for (let i = 0; i < 7; i++) {
		
		if (dateAdder.getFullYear() * 100 + dateAdder.getMonth() > checkForBreak) {
				break;
			}
    	let tr = document.createElement('tr');
		// *************** building the columns
    	for (let j = 0; j < 7; j++) {
			   		
        	let td = document.createElement('td');
        	
			td.style.width = "45px";
			td.style.textAlign = "center";
        	tr.appendChild(td)
      		if (i == 0) { // create titles
				td.innerText = weekDays[j];
				td.style.fontWeight = "600";
			} else {
				td.innerText = dateAdder.getUTCDate();
				if (displayThisMonth != dateAdder.getUTCMonth()) {
					td.style.color = "gray";
				} else {
					td.style.backgroundColor = "rgba(255,255,255,0.8)";
				}
				td.style.height = "45px";
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