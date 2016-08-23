describe("Player Model", function() {

    it("contains default values when instanciating empty arguments", function() {
        var p1 = new C4.model.Player();
        expect(p1.get('name')).toEqual("Player 1");
        expect(p1.get('id')).toEqual("player1");
        expect(p1.get('color')).toEqual("#3399ff");
    });

    describe("instanciating with arguments", function() {
        it("should contain the correct values", function() {
            var p1 = new C4.model.Player({name: "John Doe", id: "johndoe", color: "#fff"});
            expect(p1.get('name')).toEqual("John Doe");
            expect(p1.get('id')).toEqual("johndoe");
            expect(p1.get('color')).toEqual("#fff");
        });
    });
});