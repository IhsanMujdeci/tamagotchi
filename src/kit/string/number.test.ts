import {doubleDigitFill, DoubleDigitFillError} from "./number";

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
    });

    it('Should throw due to number being too low', ()=>{
        expect(()=>doubleDigitFill(-1)).toThrow(DoubleDigitFillError.TO_LOW)
    });

    it('Should throw due to number being too high', ()=>{
        expect(()=>doubleDigitFill(100)).toThrow(DoubleDigitFillError.TO_HIGH)
    });

    it('Should throw due to number being too way too low', ()=>{
        expect(()=>doubleDigitFill(-10*100)).toThrow(DoubleDigitFillError.TO_LOW)
    });

    it('Should throw due to number being too way too high', ()=>{
        expect(()=>doubleDigitFill(10*100)).toThrow(DoubleDigitFillError.TO_HIGH)
    })

});