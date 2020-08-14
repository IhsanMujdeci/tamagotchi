import {LifeCycleEnum} from "@tamagotchi/tamagotchi/lifecycle";
import {Tamagotchi} from "@tamagotchi/tamagotchi/tamagotchi";

export interface Ticker {
    tick(tamagotchi: Tamagotchi): void
}

export class Tick implements Tick{

    readonly secondsPerTick = 5;
    private needsPoopTicker = 0;
    private needsSleepTicker = 0;

    constructor() {
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

            if (tamagotchi.getAge() > 80) {
                tamagotchi.pushEvent("Your tamagotchi lived a full life span!");
                tamagotchi.setLifeCycle(LifeCycleEnum.DEAD);
                return;
            }

            this.sleepiness(tamagotchi);
            this.hunger(tamagotchi);
            this.poopLevelMax(tamagotchi);
            this.lifeCycles(tamagotchi)
        }
    }

    lifeCycles(tamagotchi: Tamagotchi){
        if (tamagotchi.health.isMin()) {
            tamagotchi.setLifeCycle(LifeCycleEnum.DEAD);
            tamagotchi.pushEvent("Your tamagotchi died due to low health :'(");
            return;
        }
        if (tamagotchi.getAge() > 21) {
            if (tamagotchi.isLifeCycle(LifeCycleEnum.ADULT)) {
                return
            }
            tamagotchi.pushEvent("Your tamagotchi is a full grown ADULT, much wow OvO");
            tamagotchi.setLifeCycle(LifeCycleEnum.ADULT);
            return
        }
        if (tamagotchi.getAge() > 12) {
            if (tamagotchi.isLifeCycle(LifeCycleEnum.TEENAGER)) {
                return
            }
            tamagotchi.pushEvent("~~ Your tamagotchi is now a moody teenager ~~");
            tamagotchi.setLifeCycle(LifeCycleEnum.TEENAGER);
            return;
        }
        if (tamagotchi.getAge() > 5) {
            if (tamagotchi.isLifeCycle(LifeCycleEnum.CHILD)) {
                return
            }
            tamagotchi.pushEvent("Child phase... commense");
            tamagotchi.setLifeCycle(LifeCycleEnum.CHILD);
            return;
        }
        if (tamagotchi.getAge() >= 2.5) {
            if (tamagotchi.isLifeCycle(LifeCycleEnum.BABY)) {
                return
            }
            tamagotchi.pushEvent("Your egg hatched! yayy");
            tamagotchi.setLifeCycle(LifeCycleEnum.BABY);
            return
        }
        if (tamagotchi.getAge() > 0) {
            tamagotchi.setLifeCycle(LifeCycleEnum.EGG)
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
                tamagotchi.pushEvent("Nobody tucked it in :'( , your tamagotchi slept by its self ...how lonely")
            }
        }
    }

    poopLevelMax(tamagotchi: Tamagotchi){
        if (tamagotchi.poopLevel.isMax()) {
            this.needsPoopTicker = this.needsPoopTicker + 1;

            if (this.needsPoopTicker > 3) {
                tamagotchi.happiness.decrement(2);
                tamagotchi.poopLevel.reset();
                tamagotchi.pushEvent("Your tamagotchi pooped its self :(")
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