describe("Example", function () {
    "use strict";

    var num;

    beforeEach(function () {
        num = 1;
    });

    afterEach(function () {
        num = undefined;
    });

    it("should increase by 1", function () {
        expect(num + 1).toEqual(2);
    });
});