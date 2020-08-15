import {LifeCycle, LifeCycleEnum} from "@tamagotchi/tamagotchi/lifecycle";
import {Tamagotchi} from "@tamagotchi/tamagotchi/tamagotchi";

export interface Ticker {
    tick(tamagotchi: Tamagotchi): void
}

export enum TickEvents {
    NATURAL_DEATH="WOW CONGRATULATIONS!! Your tamagotchi lived a full life span!",
    LOw_HEALTH_DEATH="Your tamagotchi died due to low health :'(",
    ADULT="Your tamagotchi is a full grown ADULT, much wow OvO",
    TEEN="~~ Your tamagotchi is now a moody teenager ~~",
    CHILD="Child phase... commense",
    BABY_HATCHED="Your egg hatched! yayy",
    SLEEP_SELF="Nobody tucked it in :'( , your tamagotchi slept by its self ...how lonely",
    POOP_SELF="Your tamagotchi pooped its self :O, doesn't look good :|"
}

export class Tick implements Tick{

    private readonly secondsPerTick = 5;
    private needsPoopTicker = 0;
    private needsSleepTicker = 0;

    constructor() {
    }

    getSecondsPerTick(){
        return this.secondsPerTick
    }

    ticksSinceLastCheck(lastUpdated: Date) {
        const secondsSinceCheck = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
        return Math.floor(secondsSinceCheck / this.secondsPerTick);
    }

    tick(tamagotchi: Tamagotchi) {
        const ticksSinceLastCheck = this.ticksSinceLastCheck(tamagotchi.getLastUpdated());

        for (let i = 0; i < ticksSinceLastCheck; i++) {
            tamagotchi.update();
            if (tamagotchi.isLifeCycle(LifeCycleEnum.DEAD)) {
                return
            }
            this.incrementLife(tamagotchi);

            if(this.naturalDeath(tamagotchi)){
                return
            }

            this.sleepiness(tamagotchi);
            this.hunger(tamagotchi);
            this.poopLevelMax(tamagotchi);
            this.lifeCycles(tamagotchi)
        }
    }

    naturalDeath(tamagotchi: Tamagotchi){
        if (tamagotchi.getAge() > 80) {
            tamagotchi.pushEvent(TickEvents.NATURAL_DEATH);
            tamagotchi.setLifeCycle(LifeCycleEnum.DEAD);
            return true;
        }
        return false
    }

    lifeCycles(tamagotchi: Tamagotchi){
        if (tamagotchi.health.isMin()) {
            tamagotchi.setLifeCycle(LifeCycleEnum.DEAD);
            tamagotchi.pushEvent(TickEvents.LOw_HEALTH_DEATH);
            return;
        }

        switch (LifeCycle.ageToLifeCycle(tamagotchi.getAge())) {
            case LifeCycleEnum.EGG:
                tamagotchi.setLifeCycle(LifeCycleEnum.EGG)
                return;
            case LifeCycleEnum.BABY:
                if (tamagotchi.isLifeCycle(LifeCycleEnum.BABY)) {
                    return
                }
                tamagotchi.pushEvent(TickEvents.BABY_HATCHED);
                tamagotchi.setLifeCycle(LifeCycleEnum.BABY);
                return
            case LifeCycleEnum.CHILD:
                if (tamagotchi.isLifeCycle(LifeCycleEnum.CHILD)) {
                    return
                }
                tamagotchi.pushEvent(TickEvents.CHILD);
                tamagotchi.setLifeCycle(LifeCycleEnum.CHILD);
                return;
            case LifeCycleEnum.TEENAGER:
                if (tamagotchi.isLifeCycle(LifeCycleEnum.TEENAGER)) {
                    return
                }
                tamagotchi.pushEvent(TickEvents.TEEN);
                tamagotchi.setLifeCycle(LifeCycleEnum.TEENAGER);
                return;
            case LifeCycleEnum.DEAD:
                break;
            case LifeCycleEnum.ADULT:
                if (tamagotchi.isLifeCycle(LifeCycleEnum.ADULT)) {
                    return
                }
                tamagotchi.pushEvent(TickEvents.ADULT);
                tamagotchi.setLifeCycle(LifeCycleEnum.ADULT);
                return;
        }
    }

    incrementLife(tamagotchi: Tamagotchi) {
        tamagotchi.setAge(tamagotchi.getAge() + 2.5)
    }

    sleepiness(tamagotchi: Tamagotchi){
        tamagotchi.sleepiness.increment(3);
        if (tamagotchi.sleepiness.isMax()) {
            this.needsSleepTicker = this.needsSleepTicker + 1;

            if (this.needsSleepTicker > 3) {
                tamagotchi.happiness.decrement(1);
                tamagotchi.sleepiness.reset();
                tamagotchi.pushEvent(TickEvents.SLEEP_SELF)
            }
        }
    }

    poopLevelMax(tamagotchi: Tamagotchi){
        if (tamagotchi.poopLevel.isMax()) {
            this.needsPoopTicker = this.needsPoopTicker + 1;

            if (this.needsPoopTicker > 3) {
                tamagotchi.happiness.decrement(2);
                tamagotchi.poopLevel.reset();
                tamagotchi.pushEvent(TickEvents.POOP_SELF)
            }
        }
    }

    hunger(tamagotchi: Tamagotchi) {
        tamagotchi.hunger.increment(2.5);
        if (tamagotchi.hunger.isMax()) {
            tamagotchi.health.decrement(2.5)
        } else if (tamagotchi.hunger.getValue() < 5) {
            tamagotchi.health.increment();
            tamagotchi.happiness.increment(1)
            tamagotchi.poopLevel.increment(2.5)
        } else {
            tamagotchi.poopLevel.increment(1.5)
        }

        if (tamagotchi.hunger.getValue() > 7) {
            tamagotchi.health.decrement(0.5);
            tamagotchi.weight.decrement(1);
            tamagotchi.happiness.decrement(2)
        }
    }
}