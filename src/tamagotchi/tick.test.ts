import {tamagotchi} from './'
import {anyOfClass, instance, mock, spy, verify, when} from "ts-mockito";
import {LifeCycleEnum} from "@tamagotchi/tamagotchi/lifecycle";
import {TickEvents} from "@tamagotchi/tamagotchi/tick";

describe("Tick", ()=>{

    function minusMsToDate(ms: number, d: Date = new Date()){
        return new Date(d.getTime() - ms)
    }

    it("Should create a defualt ticker", ()=>{
        const t = new tamagotchi.Tick()
    });

    describe("Ticks since last check", ()=>{
        it("Should try to get ticks since update but get 0 because too little time passed", ()=>{
            const t = new tamagotchi.Tick();
            expect(t.ticksSinceLastCheck(new Date())).toEqual(0)
        })

        it("Should try to get one tick since last past", ()=>{
            const t = new tamagotchi.Tick();
            const secondsInTick = t.getSecondsPerTick() * 1000;

            expect(t.ticksSinceLastCheck(minusMsToDate(secondsInTick))).toEqual(1)
        })

        it("Should try to get many ticks", ()=>{
            const t = new tamagotchi.Tick();
            const desiredTicks =  5
            const secondsInTick = (t.getSecondsPerTick() * desiredTicks) * 1000;

            expect(t.ticksSinceLastCheck(minusMsToDate(secondsInTick))).toEqual(desiredTicks)
        })
    })

    describe('Tick', function(){



        it('Should not tick at all due to no ticks', ()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpu = spy(tama);

            tick.tick(tama)
            verify(tamaSpu.update()).never();

        })

        it('Should tick once but quick because dead', ()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpy = spy(tama);

            when(tickSpy.ticksSinceLastCheck(anyOfClass(Date))).thenReturn(1);

            tama.setLifeCycle(LifeCycleEnum.DEAD);
            tick.tick(tama);

            verify(tamaSpy.update()).once();
            verify(tickSpy.incrementLife(tama)).never();
            verify(tickSpy.naturalDeath(tama)).never();
            verify(tickSpy.sleepiness(tama)).never();
            verify(tickSpy.hunger(tama)).never();
            verify(tickSpy.poop(tama)).never();
            verify(tickSpy.lifeCycles(tama)).never();
        })

        it('Should tick once but quit early due to natural death', ()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpy = spy(tama);

            when(tickSpy.ticksSinceLastCheck(anyOfClass(Date))).thenReturn(1);
            when(tickSpy.naturalDeath(tama)).thenReturn(true);

            tick.tick(tama);

            verify(tamaSpy.update()).once();
            verify(tickSpy.incrementLife(tama)).once();
            verify(tickSpy.naturalDeath(tama)).once();
            verify(tickSpy.sleepiness(tama)).never();
            verify(tickSpy.hunger(tama)).never();
            verify(tickSpy.poop(tama)).never();
            verify(tickSpy.lifeCycles(tama)).never();
        })

        it('Should tick once', ()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpy = spy(tama);

            when(tickSpy.ticksSinceLastCheck(anyOfClass(Date))).thenReturn(1);

            tick.tick(tama);

            verify(tamaSpy.update()).once();
            verify(tickSpy.incrementLife(tama)).once();
            verify(tickSpy.naturalDeath(tama)).once();
            verify(tickSpy.sleepiness(tama)).once();
            verify(tickSpy.hunger(tama)).once();
            verify(tickSpy.poop(tama)).once();
            verify(tickSpy.lifeCycles(tama)).once();
        })
    })

    describe('Natural death', ()=>{

        it('Should not diet yet',()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpy = spy(tama);

            when(tamaSpy.getAge()).thenReturn(0);

            expect(tick.naturalDeath(tama)).toEqual(false)
        })

        it('Should die naturally',()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpy = spy(tama);

            when(tamaSpy.getAge()).thenReturn(81);

            expect(tick.naturalDeath(tama)).toEqual(true)
            verify(tamaSpy.pushEvent(TickEvents.NATURAL_DEATH)).once()
            verify(tamaSpy.setLifeCycle(LifeCycleEnum.DEAD)).once()
        })

    })


    describe("Max Poop", ()=>{

        it('Should tick poop but not self poop', ()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpy = spy(tama);
            const oldPoopTicker = tick.getNeedsPoopTicker();
            when(tamaSpy.isMaxPoop()).thenReturn(true);
            when(tickSpy.shouldSelfPoop()).thenReturn(false);

            tick.poop(tama);
            expect(tick.getNeedsPoopTicker()).toBeGreaterThan(oldPoopTicker);
            verify(tamaSpy.selfPoop()).never()
            verify(tamaSpy.pushEvent(TickEvents.POOP_SELF)).never()
        })

        it('Should tick poop and self poop', ()=>{
            const tick = new tamagotchi.Tick();
            const tickSpy = spy(tick);
            const tama = tamagotchi.createTamagotchi();
            const tamaSpy = spy(tama);
            const oldPoopTicker = tick.getNeedsPoopTicker();
            when(tamaSpy.isMaxPoop()).thenReturn(true);
            when(tickSpy.shouldSelfPoop()).thenReturn(true);

            tick.poop(tama);
            expect(tick.getNeedsPoopTicker()).toBe(0);
            verify(tamaSpy.selfPoop()).once();
            verify(tamaSpy.pushEvent(TickEvents.POOP_SELF)).once()
        })

        it('Should return false self poop', ()=>{
            const tick = new tamagotchi.Tick();
            expect(tick.shouldSelfPoop()).toEqual(false)
        })

        it('Should return true self poop', ()=>{
            const tick = new tamagotchi.Tick();
            const mockTama = mock(tamagotchi.Tamagotchi);
            when(mockTama.isMaxPoop()).thenReturn(true)
            const tama = instance(mockTama)
            tick.poop(tama)
            tick.poop(tama)
            tick.poop(tama)
            tick.poop(tama)
            expect(tick.shouldSelfPoop()).toEqual(true)
        })

    })

});
