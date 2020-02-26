function openPopup() {

    var printView = window.open("", '_blank');
    if (printView) {
        //Browser allows popups
        let allDates = "";
        let allPages = "";
        let pages = savedData.books[savedData.currentBook].goalPages;
        savedData.books[savedData.currentBook].readingDates.forEach(function (value, i) {

            let pagesRange = "";
            if (i == (savedData.books[savedData.currentBook].readingDates.length - 1)) {
                pagesRange = "the last pages";
            } else {
                pagesRange = `pages ${pages * i} - ${pages * i + pages - 1}`;
            }

            allDates += String(value)+"<br>";
            allPages += pagesRange + "<br>";
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
    <title>iReadMore - Reading Plan</title>
</head>
<body>
    <header>  
        <div id="logo-print"><em>iReadMore</em></div>
    </header>

    <section>
    <div id="print-introduction">Reading plan for ${savedData.books[savedData.currentBook].bookTitle}</div>
    <div class="row">
        <div class="col-6">
            <h3>Date</h3>
            <hr>
            ${allDates}
        </div>
        <div class="col-4">
            <h3>Pages</h3>
            <hr>
            ${allPages}
        </div>
        <div class="col-2">
            <h3>Check</h3>
            <hr>
            ${allPages}
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