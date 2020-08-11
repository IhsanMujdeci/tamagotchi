import {doubleDigitFill} from "./number";

describe("Test string numbers", ()=>{

    it("Should not do anything to number, just str", ()=>{
        expect(doubleDigitFill(10)).toEqual("10")
    });

    it("Should add a 0 to compensate", ()=>{
        expect(doubleDigitFill(2)).toEqual("02")
    });

    it("Should add a 0 to end of 0", ()=>{
        expect(doubleDigitFill(0)).toEqual("00")
    });

    it("Should do nothing to big number", ()=>{
        expect(doubleDigitFill(99)).toEqual("99")
    })

});