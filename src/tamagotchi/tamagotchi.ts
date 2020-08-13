import {Model} from "./model";
import {Statistic} from "./statistic";
import {LifeCycleEnum} from "./lifecycle";
import {Tick} from './tick'
interface Feeder {
    feed(): void
}

interface Sleeper {
    sleep(): void
}

interface Pooper {
    poop(): void
}

interface LogClearer {
    clearEvents(): void
}

export class Tamagotchi implements Feeder, Sleeper, Pooper, LogClearer{

    happiness: Statistic;
    sleepiness: Statistic;
    hunger: Statistic;
    poopLevel: Statistic;
    weight: Statistic;
    health: Statistic;

    private ticker: Tick;
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
        this.ticker = new Tick();
    }

    feed(){
        if(!this.hunger.isMin()){
            this.hunger.decrement();
            this.weight.increment();
            this.happiness.increment();
        }
    }

    setName(name: string){
        this.tamagotchi.name = name
    }
    getName(){
        return this.tamagotchi.name;
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

    getAge() {
        return this.tamagotchi.age
    }

    getLastUpdated(){
        return this.tamagotchi.lastUpdated
    }

    setAge(age: number){
        this.tamagotchi.age = age
    }

    update(){
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

    setLifeCycle(lifeCycle: LifeCycleEnum){
        this.tamagotchi.lifeCycle = lifeCycle
    }

    isLifeCycle(lifeCycle: LifeCycleEnum){
        return this.tamagotchi.lifeCycle === lifeCycle
    }

}

export function createTamagotchi(){
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
        health: 10,
        name: "",
    })
}