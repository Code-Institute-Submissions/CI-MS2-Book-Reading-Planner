countDays = function (totalPages, pagesPerDay) {
    if ((totalPages + pagesPerDay) - Math.floor(totalPages+pagesPerDay) != 0) {
        alert("Error! please enter integer number");
    } else if (totalPages > 5000 || pagesPerDay > 5000) {
        alert("Error! Don't enter more than 5000 pages");
    } else if (totalPages < 1 || pagesPerDay < 1) {
        alert("Error! Value must not be smaller than 1");
    } else {
        let checkOverflow = totalPages % pagesPerDay;
        let result = parseInt(totalPages/pagesPerDay);
        if (checkOverflow != 0) {
            result +=1;
        }
        return result;
    }
}

countPages = function (date1, date2) {

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    const oneDay = 1000 * 60 * 60 * 24;

    // get difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to number of days
    let result = Math.round(differenceMs / oneDay) + 1; //+1 because start and end date counts

    if (date2 < date1) {
        alert("Error! The date must not be in the past");
    }
    
    return result;
}