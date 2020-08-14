import {createTamagotchi, TamagotchiErrors} from "@tamagotchi/tamagotchi/tamagotchi";

function promiseWait(time: number){
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, time)
    })
}

describe("Tamagotchi test", ()=>{

   it("Set tamagotchi name", ()=>{
       const name = "Henry";
       const t = createTamagotchi();
       t.setName(name);
       expect(t.getName()).toEqual(name)
   })

    describe("Feeding", ()=>{

        it("Should try feed when not hungry", ()=>{
            const t = createTamagotchi()

            const hunger = t.hunger.getValue()
            const weight = t.weight.getValue()
            const happiness = t.happiness.getValue()

            t.hunger.reset();
            t.feed()

            expect(t.hunger.getValue()).toEqual(0)
            expect(t.hunger.getValue()).not.toEqual(hunger)
            expect(t.weight.getValue()).toEqual(weight)
            expect(t.happiness.getValue()).toEqual(happiness)
        })

        it("Should try feed when hungry", ()=>{
            const t = createTamagotchi()

            const hunger = t.hunger.getValue()
            const weight = t.weight.getValue()
            const happiness = t.happiness.getValue()

            t.feed()

            expect(t.hunger.getValue()).toEqual(hunger - 1);
            expect(t.weight.getValue()).toEqual(weight + 1);
            expect(t.happiness.getValue()).toEqual(happiness + 1);
        })

    })

    describe("Age", ()=>{
        it("Should get a new born", ()=>{
            const t = createTamagotchi()
            expect(t.getAge()).toEqual(0)
        })

        it("Should set age", ()=>{
            const newAge = 5
            const t = createTamagotchi()
            t.setAge(newAge)
            expect(t.getAge()).toEqual(newAge)
        })

        it("Should set age very high", ()=>{
            const newAge = 9999
            const t = createTamagotchi()
            t.setAge(newAge)
            expect(t.getAge()).toEqual(newAge)
        })

        it("Should set age to too small", ()=>{
            const newAge = -1;
            const t = createTamagotchi();
            expect(()=>t.setAge(newAge)).toThrow(TamagotchiErrors.AGE_TO_SMALL)
        })
    })

    describe("Update", ()=>{
        it("Should get initial last updated at value", async ()=>{
            const testStartDate = new Date();
            await promiseWait(10);
            const t = createTamagotchi();
            await promiseWait(10);
            const afterCreation = new Date();
            expect(t.getLastUpdated().getTime()).toBeGreaterThan(testStartDate.getTime());
            expect(t.getLastUpdated().getTime()).toBeLessThan(afterCreation.getTime());
        });

        it("Should initial update value", async ()=>{
            const testStartDate = new Date();
            await promiseWait(10);
            const t = createTamagotchi();
            await promiseWait(10);
            const afterCreation = new Date();
            await promiseWait(10);
            t.update();
            expect(t.getLastUpdated().getTime()).toBeGreaterThan(afterCreation.getTime());
            expect(t.getLastUpdated().getTime()).toBeGreaterThan(testStartDate.getTime())
        });
    })

    describe('Events', ()=>{

        it('Should test empty base case of new tamagotchi',()=>{
            const t = createTamagotchi();
            expect(t.getEvents()).toEqual([])
        })

        it('Should test adding one event',()=>{
            const eventName = 'test'
            const t = createTamagotchi();
            t.pushEvent(eventName)
            expect(t.getEvents().length).toEqual(1)
            expect(t.getEvents()[0]).toEqual(eventName)
        })

        it('Should test adding many events',()=>{
            const t = createTamagotchi();
            const eventNames = ['a','b','c'];

            for(let i = 0; i < eventNames.length; i++){
                t.pushEvent(eventNames[i])
            }

            expect(t.getEvents().length).toEqual(eventNames.length)
            t.getEvents().forEach((e,i)=>{
               expect(e).toEqual(eventNames[i])
            })
        })

        it('Should clear events',()=>{
            const t = createTamagotchi();
            t.pushEvent("a");
            t.pushEvent("b");
            t.pushEvent("c");

            expect(t.getEvents().length).toEqual(3)
            t.clearEvents();
            expect(t.getEvents().length).toEqual(0)
        })

    });

   describe('Lifecycle', ()=>{

   })
});