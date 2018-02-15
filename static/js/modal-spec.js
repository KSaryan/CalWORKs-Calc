describe("Testing calculateIncome", function() {

	it("should give an error message", function(){

		let msg = calculateIncome("500", "");
		expect(msg) == 'You have made an error in filling out this form. Please try again.'

	});

	it("should let user know if  expenses > income", function(){

		let msg = calculateIncome("500", "600");
		expect(msg) == 'Your expenses are greater than your earnings'

	});

	it("should calculate self-employment income", function(){

		let msg = calculateIncome("500", "600");
		expect(msg) == `Add $100.00 to your monthly income`

	});

});



describe("Testing calcExpenses", function() {

	it('should return ""', function(){

		let expenses = calcExpenses("", "500");
		expect(expenses) == ""; 

	});

	it("should calculate expenses", function(){

		let expenses = calcExpenses("forty", "100");
		expect(expenses) == 40;

	});

});