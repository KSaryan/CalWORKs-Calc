describe("Testing checkMissingCat", function(){
	
	it("should return true if missing cat", function(){
		let missingCat = checkMissingCat({1: {"ABCDE": "None"}, 2: {"ABCDE": "A"}})
		expect(missingCat) == true;
	});

	it("should return false otherwise", function(){
		let missingCat = checkMissingCat({1: {"ABCDE": "B"}, 2: {"ABCDE": "A"}})
		expect(missingCat) == false;
	});

}

)