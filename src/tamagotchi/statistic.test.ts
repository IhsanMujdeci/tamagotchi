import {Statistic, StatisticErrors} from "@tamagotchi/tamagotchi/statistic";

describe("Tamagotchi Statistics", ()=>{

    it("Should create a statistic with certain value", ()=>{
        const value = 1;
        const s =  new Statistic(value);
        expect(s.getValue()).toEqual(value)
    })

    it('Should create statistic with no args',()=>{
        expect(new Statistic().getValue()).toEqual(5)
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

    it("Should try increment over max and be limited", ()=>{
        const s =  new Statistic(Statistic.max-1);
        s.increment(2);
        expect(s.getValue()).toEqual(Statistic.max)
    })

    it("Should try increment under min and be limited", ()=>{
        const s =  new Statistic(Statistic.min+1);
        s.decrement(2);
        expect(s.getValue()).toEqual(Statistic.min)
    })

});