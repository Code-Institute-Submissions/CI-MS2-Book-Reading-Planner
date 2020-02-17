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