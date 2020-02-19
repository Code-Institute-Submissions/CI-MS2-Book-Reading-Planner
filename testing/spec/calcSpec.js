describe("CountDays", function() {
    describe("Check correct count", function(){
        it("should exist", function () {
            expect(countDays).toBeDefined();
        });

        it("should return 17 (total read counts)", function() {
            let result = countDays(325,20);
            expect(result).toBe(17);
        });

        it("should return 28 (total read counts)", function() {
            let result = countDays(560,20);
            expect(result).toBe(28);
        });

        it("should return 1 (total read counts)", function() {
            let result = countDays(10,2546);
            expect(result).toBe(1);
        });
    });
    describe("Errors", function(){

        // *********************** checking errors: not an integer number 
        it("should return an error (Please enter an integer number)", function() {
            spyOn(window, "alert");
            let result = countDays(546.2,20);
            expect(window.alert).toHaveBeenCalledWith("Error! please enter integer number");
        });

        it("should return an error (Please enter an integer number)", function() {
            spyOn(window, "alert");
            let result = countDays(546,20.5);
            expect(window.alert).toHaveBeenCalledWith("Error! please enter integer number");
        });

        // *********************** checking error: entered a number > 5000
        it("should return an error (Book can't have more than 5000 pages)", function() {
            spyOn(window, "alert");
            let result = countDays(5001,15);
            expect(window.alert).toHaveBeenCalledWith("Error! Don't enter more than 5000 pages");
        });

        it("should return an error (Book can't have more than 5000 pages)", function() {
            spyOn(window, "alert");
            let result = countDays(500,5001);
            expect(window.alert).toHaveBeenCalledWith("Error! Don't enter more than 5000 pages");
        });

        // *********************** checking error: entered a number < 1
        it("should return an error (Must not be smaller than 1)", function() {
            spyOn(window, "alert");
            let result = countDays(-2,15);
            expect(window.alert).toHaveBeenCalledWith("Error! Value must not be smaller than 1");
        });

        it("should return an error (Must not be smaller than 1)", function() {
            spyOn(window, "alert");
            let result = countDays(20,0);
            expect(window.alert).toHaveBeenCalledWith("Error! Value must not be smaller than 1");
        });
    })
})

describe("countPages", function() {
    describe("Check correct count", function(){
        it("should exist", function () {
            expect(countPages).toBeDefined();
        });
        it("should return 76", function() {
            let date1 = new Date(2020,1,19);
            let date2 = new Date(2020,4,4);
            let result = countPages(date1, date2);
            expect(result).toBe(76);
        });
        it("should return 966", function() {
            let date1 = new Date(2020,1,19);
            let date2 = new Date(2022,9,11); 
            let result = countPages(date1, date2);
            expect(result).toBe(966);
        });
        it("should return 1", function() {
            let date1 = new Date(2020,1,19);
            let date2 = new Date(2020,1,19); 
            let result = countPages(date1, date2);
            expect(result).toBe(1);
        });
        it("should return 2", function() {
            let date1 = new Date(2020,1,19);
            let date2 = new Date(2020,1,20); 
            let result = countPages(date1, date2);
            expect(result).toBe(2);
        });

    });
    describe("Errors", function(){

        //*********************** checking error: date in the past 
        it("should return an error (date is in the past)", function() {
            spyOn(window, "alert");
            let date1 = new Date(2020,1,19);
            let date2 = new Date(2020,1,18);
            let result = countPages(date1,date2);
            expect(window.alert).toHaveBeenCalledWith("Error! The date must not be in the past");
        });
    })
})