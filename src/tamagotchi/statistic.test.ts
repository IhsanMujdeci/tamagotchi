import {Statistic, StatisticErrors} from "@tamagotchi/tamagotchi/statistic";

describe("Tamagotchi Statistics", ()=>{

    it("Should create a statistic with certain value", ()=>{
        const value = 1;
        const s =  new Statistic(value);
        expect(s.getValue()).toEqual(value)
    })

    it("Should create a increment stat", ()=>{
        const value = 1;
        const s =  new Statistic(value);
        s.increment()
        expect(s.getValue()).toEqual(value+1)
    })

    it("Should create a decrement stat", ()=>{
        const value = 1;
        const s =  new Statistic(value);
        s.decrement()
        expect(s.getValue()).toEqual(value-1)
    })

    it("Should not go above mac", ()=>{
        const value = Statistic.max;
        const s =  new Statistic(value);
        s.increment();
        expect(s.getValue()).toEqual(value)
    })

    it("Should not go below min", ()=>{
        const value = Statistic.min;
        const s =  new Statistic(value);
        s.decrement();
        expect(s.getValue()).toEqual(value)
    })

    it("Should not init number too high", ()=>{
        expect(()=>new Statistic(Statistic.max + 1)).toThrow(StatisticErrors.TO_HIGH)
    })

    it("Should not init number too low", ()=>{
        expect(()=>new Statistic(Statistic.min - 1)).toThrow(StatisticErrors.TO_LOW)
    })

});