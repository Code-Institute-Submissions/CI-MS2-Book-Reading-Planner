function openPopup() {

    var printView = window.open("", '_blank');
    if (printView) {
        //Browser allows popups
        let allDates = "";
        let allPages = "";
        let allCheckboxes = "";
        let allRemarks = "";
        let pages = savedData.books[savedData.currentBook].goalPages;
        savedData.books[savedData.currentBook].readingDates.forEach(function (date, i) {

            let pagesRange = "";
            if (i == (savedData.books[savedData.currentBook].readingDates.length - 1)) {
                pagesRange = "the last pages";
            } else {
                pagesRange = `${pages * i} - ${pages * i + pages - 1}`;
            }
            allDates += `${calendarLabels.weekDays[date.getDay()]}, ${calendarLabels.allMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} <br><hr>`;
            allPages += pagesRange + "<br><hr>";
            allCheckboxes += `<i class="far fa-square"></i><br><hr>`;
            allRemarks += "<br><hr>";
        });


        printView.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Blinker:300,600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Chela+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/print-style.css">
    <title>iReadMore - Reading Plan</title>
</head>
<body>
    <header class="container-xl">  
        <div id="logo"><em>iReadMore</em></div>
    </header>

    <section class="container-xl">
    <div id="print-introduction"><h1>Reading plan for ${savedData.books[savedData.currentBook].bookTitle}</h1></div>
    <div class="row">
        
        <div class="col-3 col-padding">
            <h3>Date</h3>
            <hr>
            ${allDates}
        </div>
        <div class="col-2 col-padding">
            <h3>Pages</h3>
            <hr>
            ${allPages}
        </div>
        <div class="col-1 col-padding">
            <h3>Check</h3>
            <hr>
            ${allCheckboxes}
        </div>
        <div class="col-6 col-padding">
            <h3>Remarks</h3>
            <hr>
            ${allRemarks}
        </div> 
    </div>
    </section>
    
</body>
</html>
        `);
        printView.focus();
    } else {
        //Browser has blocked it
        alert("Please disable the popup blocker in the browser settings.");
    }

}