import {Clock} from "./clock";

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
        });

        it("Add a day", ()=>{
            const c = new Clock();
            c.incrementMinute(60 * 24);
            expect(c.getMinute()).toEqual(0);
            expect(c.getHour()).toEqual(0);
            expect(c.getDay()).toEqual(1);
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
        });


        it("Add a few hours and days", ()=>{
            const c = new Clock();
            c.incrementHour(52);
            expect(c.getMinute()).toEqual(0);
            expect(c.getHour()).toEqual(4);
            expect(c.getDay()).toEqual(2)
        });
    })

});

