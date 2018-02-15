describe("My Test Suite", function () {

    it("should make money", function () {
        var mon = makeMoney(2);
        expect(mon).toBe('$2.00');
    });

});