import {LifeCycleEnum} from "@tamagotchi/tamagotchi/lifecycle";
import {Tamagotchi} from "@tamagotchi/tamagotchi/tamagotchi";

export class Tick {

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

            tamagotchi.setAge(tamagotchi.getAge() + 2.5)

            if (tamagotchi.getAge() > 80) {
                tamagotchi.pushEvent("Your tamagotchi lived a full life span!");
                tamagotchi.setLifeCycle(LifeCycleEnum.DEAD)
                return;
            }

            tamagotchi.sleepiness.increment(3);
            if (tamagotchi.sleepiness.isMax()) {
                this.needsSleepTicker = this.needsSleepTicker + 1;

                if (this.needsSleepTicker > 3) {
                    tamagotchi.happiness.decrement(1);
                    tamagotchi.sleepiness.reset();
                    tamagotchi.pushEvent("Your tamagotchi slept by its self")
                }
            }

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

            if (tamagotchi.poopLevel.isMax()) {
                this.needsPoopTicker = this.needsPoopTicker + 1;

                if (this.needsPoopTicker > 3) {
                    tamagotchi.happiness.decrement(2);
                    tamagotchi.poopLevel.reset();
                    tamagotchi.pushEvent("Your tamagotchi pooped its self :(")
                }
            }

            if (tamagotchi.health.isMin()) {
                tamagotchi.setLifeCycle(LifeCycleEnum.DEAD)
                tamagotchi.pushEvent("Your tamagotchi died due to low health :'(");
                return;
            } else if (tamagotchi.getAge() > 21) {
                if (tamagotchi.isLifeCycle(LifeCycleEnum.ADULT)) {
                    return
                }
                tamagotchi.pushEvent("Your tamagotchi is a full grown ADULT, much wow OvO");
                tamagotchi.setLifeCycle(LifeCycleEnum.ADULT)
            } else if (tamagotchi.getAge() > 12) {
                if (tamagotchi.isLifeCycle(LifeCycleEnum.TEENAGER)) {
                    return
                }
                tamagotchi.pushEvent("~~ Your tamagotchi is now a moody teenager ~~");
                tamagotchi.setLifeCycle(LifeCycleEnum.TEENAGER)
            } else if (tamagotchi.getAge() > 5) {
                if (tamagotchi.isLifeCycle(LifeCycleEnum.CHILD)) {
                    return
                }
                tamagotchi.pushEvent("Child phase... commense")
                tamagotchi.setLifeCycle(LifeCycleEnum.CHILD)
            } else if (tamagotchi.getAge() >= 2.5) {
                if (tamagotchi.isLifeCycle(LifeCycleEnum.BABY)) {
                    return
                }
                tamagotchi.pushEvent("Your egg hatched! yayy")
                tamagotchi.setLifeCycle(LifeCycleEnum.BABY)
            } else if (tamagotchi.getAge() > 0) {
                tamagotchi.setLifeCycle(LifeCycleEnum.EGG)
            }
        }
    }
}