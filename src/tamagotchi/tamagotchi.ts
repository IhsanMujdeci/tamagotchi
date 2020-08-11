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

export class Tamagotchi implements Feeder, Sleeper, Pooper{

    happiness: Statistic;
    sleepiness: Statistic;
    hunger: Statistic;
    poopLevel: Statistic;
    weight: Statistic;
    health: Statistic;

    readonly secondsPerTick = 5;

    private needsPoopTicker = 0;
    private needsSleepTicker = 0;

    private events: string[] = [];

    constructor(
        private tamagotchi: Model
    ) {
        this.happiness = new Statistic(tamagotchi.happiness);
        this.sleepiness = new Statistic(tamagotchi.sleepiness);
        this.hunger = new Statistic(tamagotchi.hunger);
        this.poopLevel = new Statistic(tamagotchi.poop);
        this.weight = new Statistic(tamagotchi.weight);
        this.health = new Statistic(tamagotchi.health)
    }

    feed(){
        if(!this.hunger.isMin()){
            this.hunger.decrement();
            this.weight.increment();
            this.happiness.increment();
        }
    }

    poop(){
        if(this.poopLevel.getValue() > 5){
            this.happiness.increment(1);
            this.poopLevel.reset();
            this.events.push("Yayy, I pooped")
        } else {
            this.events.push("I dont need toilet yet >:|")
        }
    }

    sleep(): void {
        if (this.sleepiness.getValue() > 7) {
            this.events.push("Fast asleep ZzZZ...");
            this.happiness.increment(5);
            this.sleepiness.reset()
        } else {
            this.events.push("I dont need any rest!")
        }
    }

    getAge(){
        return this.tamagotchi.age
    }

    ticksSinceLastCheck(){
        const secondsSinceCheck = Math.floor((Date.now() - this.tamagotchi.lastUpdated.getTime()) / 1000);
        return Math.floor(secondsSinceCheck / this.secondsPerTick);
    }

    tick(){
        const ticksSinceLastCheck = this.ticksSinceLastCheck();

        for(let i =0; i < ticksSinceLastCheck; i++){
            this.upadted();

            if(this.tamagotchi.lifeCycle === LifeCycleEnum.DEAD){
                return
            }

            this.tamagotchi.age = this.tamagotchi.age + 2.5;

            if(this.getAge() > 80){
                this.pushEvent("Your tamagotchi lived a full life span!");
                this.tamagotchi.lifeCycle = LifeCycleEnum.DEAD;
                return;
            }

            this.hunger.increment(2.5);

            if(this.hunger.getValue() < 5){
                this.happiness.increment(1)
            }

            this.sleepiness.increment(3);
            if(this.sleepiness.isMax()){
                this.needsSleepTicker = this.needsSleepTicker + 1;

                if(this.needsSleepTicker > 3){
                    this.happiness.decrement(1);
                    this.sleepiness.reset();
                    this.pushEvent("Your tamagotchi slept by its self")
                }

            }

            if(this.hunger.isMax()){
                this.health.decrement(2.5)
            }
            if(this.health.isMin()){
                this.tamagotchi.lifeCycle = LifeCycleEnum.DEAD
                this.pushEvent("Your tamagotchi died due to low health :'(")
                return;
            }



            if(this.hunger.getValue() < 5){
                this.health.increment();
                this.poopLevel.increment(2.5)
            } else {
                this.poopLevel.increment(1.5)
            }
            if(this.hunger.getValue() > 7){
                this.health.decrement(0.5);
                this.weight.decrement(1);
                this.happiness.decrement(2)
            }

            if(this.poopLevel.isMax()){
                this.needsPoopTicker = this.needsPoopTicker + 1;

                if(this.needsPoopTicker > 3){
                    this.happiness.decrement(2);
                    this.poopLevel.reset();
                    this.events.push("Your tamagotchi pooped its self :(")
                }
            }
            if(this.getAge() > 21){
                if(this.tamagotchi.lifeCycle === LifeCycleEnum.ADULT){
                    return
                }
                this.pushEvent("Your tamagotchi is a full grown ADULT, much wow OvO");
                this.tamagotchi.lifeCycle = LifeCycleEnum.ADULT;
            } else if(this.getAge() > 12){
                if(this.tamagotchi.lifeCycle === LifeCycleEnum.TEENAGER){
                    return
                }
                this.pushEvent("~~ Your tamagotchi is now a moody teenager ~~");
                this.tamagotchi.lifeCycle = LifeCycleEnum.TEENAGER
            } else if(this.getAge() > 5){
                if(this.tamagotchi.lifeCycle === LifeCycleEnum.CHILD){
                    return
                }
                this.pushEvent("Child phase... commense")
                this.tamagotchi.lifeCycle = LifeCycleEnum.CHILD
            } else if(this.getAge() >= 2.5){
                if(this.tamagotchi.lifeCycle === LifeCycleEnum.BABY){
                    return
                }
                this.pushEvent("Your egg hatched! yayy")
                this.tamagotchi.lifeCycle = LifeCycleEnum.BABY
            } else if(this.getAge() > 0){
                this.tamagotchi.lifeCycle = LifeCycleEnum.EGG
            }


        }
    }

    upadted(){
        this.tamagotchi.lastUpdated = new Date();
    }

    getLifeCycle(){
        return this.tamagotchi.lifeCycle
    }

    getEvents(){
        return this.events
    }

    pushEvent(e: string){
        this.events.push(e)
    }

    clearEvents(){
        this.events = [];
    }

}

export function newTamagotchi(){
    return new Tamagotchi({
        lifeCycle: LifeCycleEnum.EGG,
        happiness: 5,
        age: 0,
        weight: 1,
        hunger: 5,
        sleepiness: 5,
        createdAt: new Date(),
        lastUpdated: new Date(),
        poop: 0,
        health: 10
    })
}