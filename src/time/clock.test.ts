import {Clock} from "./clock";
import {string} from "@kit/string";

describe('Clock tests',()=>{

    describe("test minute", ()=>{
        it("Small minute change", ()=>{
            const c = new Clock();
            c.incrementMinute(1);
            expect(c.getMinute()).toEqual(1);
            expect(c.getHour()).toEqual(0);
            expect(c.getDay()).toEqual(0);
        });

        it("Add an hour", ()=>{
            const c = new Clock();
            c.incrementMinute(60);
            expect(c.getMinute()).toEqual(0);
            expect(c.getHour()).toEqual(1);
            expect(c.getDay()).toEqual(0);
        });

        it("Add an hour and some minutes", ()=>{
            const c = new Clock();
            c.incrementMinute(75);
            expect(c.getMinute()).toEqual(15);
            expect(c.getHour()).toEqual(1);
            expect(c.getDay()).toEqual(0);
            expect(c.toString()).toEqual("Day: 0 | Time 01:15")
        });

        it("Add a day", ()=>{
            const c = new Clock();
            c.incrementMinute(60 * 24);
            expect(c.getMinute()).toEqual(0);
            expect(c.getHour()).toEqual(0);
            expect(c.getDay()).toEqual(1);
            expect(c.toString()).toEqual("Day: 1 | Time 00:00")
        });
    })

    describe("test hour", ()=>{
        it("Small hour change", ()=>{
            const c = new Clock();
            c.incrementHour(1);
            expect(c.getMinute()).toEqual(0)
            expect(c.getHour()).toEqual(1)
            expect(c.getDay()).toEqual(0)
        });

        it("Add day with hour", ()=>{
            const c = new Clock();
            c.incrementHour(24);
            expect(c.getMinute()).toEqual(0)
            expect(c.getHour()).toEqual(0)
            expect(c.getDay()).toEqual(1)
            expect(c.toString()).toEqual("Day: 1 | Time 00:00")

        });


        it("Add a few hours and days", ()=>{
            const c = new Clock();
            c.incrementHour(52);
            expect(c.getMinute()).toEqual(0);
            expect(c.getHour()).toEqual(4);
            expect(c.getDay()).toEqual(2)
            expect(c.toString()).toEqual("Day: 2 | Time 04:00")
        });
    })

    it('Should test toString of init', ()=>{
        const c = new Clock();
        expect(c.toString()).toEqual("Day: 0 | Time 00:00")
    })

});

