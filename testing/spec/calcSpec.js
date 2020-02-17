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

/*
describe("FizzBuzz", function () {

    beforeEach(function () {
        FizzBuzz = new fizzBuzz();
    });

    describe("Checks Modulus", function () {
        it("should exist", function () {
            expect(fizzBuzz).toBeDefined();
        });

        it("should return FizzBuzz if divisible by 3 and by 5", function () {
            var result = fizzBuzz(15);
            expect(result).toBe("FizzBuzz");
        });

        it("should return Fizz if divisible by 3", function () {
            var result = fizzBuzz(9);
            expect(result).toBe("Fizz");
        });

        it("should return Buzz if divisible by 5", function () {
            var result = fizzBuzz(25);
            expect(result).toBe("Buzz");
        });

        it("should return number if not divisile by 3 or by 5", function () {
            var result = fizzBuzz(2);
            expect(result).toBe(2);
        });

        it("should return an error if we don't supply a number", function() {
            spyOn(window, "alert");
            var result = fizzBuzz(alert("Error!"));
            expect(window.alert).toHaveBeenCalledWith("Error!");
        });
    });
});

*/