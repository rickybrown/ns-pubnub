var Pubnub = require("nativescript-pubnub").Pubnub;
var pubnub = new Pubnub();

describe("greet function", function() {
    it("exists", function() {
        expect(pubnub.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(pubnub.greet()).toEqual("Hello, NS");
    });
});