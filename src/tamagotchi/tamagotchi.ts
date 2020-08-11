import {Model} from "./model";
import {Statistic} from "./statistic";
import {LifeCycleEnum} from "./lifecycle";

interface Feeder {
    feed(): void
}

interface Sleeper {
    sleep(): void
}

interface Pooper {
    poop(): void
}

// maybe as time goes on we can decrement hunger, increment sleepiness,
// depending on hunger level poop can

export class Tamagotchi implements Feeder, Sleeper, Pooper{

    happiness: Statistic;
    sleepiness: Statistic;
    hunger: Statistic;
    poopLevel: Statistic;
    weight: Statistic;

    constructor(
        private tamagotchi: Model
    ) {
        this.happiness = new Statistic(tamagotchi.happiness);
        this.sleepiness = new Statistic(tamagotchi.sleepiness);
        this.hunger = new Statistic(tamagotchi.hunger);
        this.poopLevel = new Statistic(tamagotchi.poop);
        this.weight = new Statistic(tamagotchi.weight)
    }

    feed(){
        if(!this.hunger.isMax()){
            this.hunger.decrement();
            this.weight.increment();
            this.happiness.increment();
        }
    }

    poop(){
        if(this.poopLevel.getValue() > 5){
            this.poopLevel.reset()
        }
    }

    sleep(): void {
        if(this.sleepiness.getValue() > 7){
            this.sleepiness.reset()
        }
    }

}

export function newTamagotchi(){
    return new Tamagotchi({
        lifeCycle: LifeCycleEnum.BABY,
        happiness: 5,
        age: 0,
        weight: 1,
        hunger: 5,
        sleepiness: 5,
        createdAt: new Date(),
        poop: 0
    })
}