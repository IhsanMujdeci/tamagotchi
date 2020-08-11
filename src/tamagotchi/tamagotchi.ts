import {Model} from "./model";
import {Statistic} from "./statistic";

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

class Tamagotchi implements Feeder, Sleeper, Pooper{

    private happiness: Statistic;
    private sleepiness: Statistic;
    private hunger: Statistic;
    private poopLevel: Statistic;

    constructor(
        private tamagotchi: Model
    ) {
        this.happiness = new Statistic(tamagotchi.happiness);
        this.sleepiness = new Statistic(tamagotchi.sleepiness);
        this.hunger = new Statistic(tamagotchi.hunger);
        this.poopLevel = new Statistic(tamagotchi.poop);
    }

    feed(){
        if(!this.hunger.isMax()){
            this.hunger.increment();
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