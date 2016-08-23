describe("Connect4", function() {

    it("contains the global namespace C4", function() {
        expect(C4).not.toBe(null);
    });

    it("contains model and view", function() {
        expect(C4.view).not.toBeUndefined();
        expect(C4.model).not.toBeUndefined();
    });

    it("should instanciate the gameboard view", function() {
        expect(gameboard).not.toBeUndefined();
    })
});