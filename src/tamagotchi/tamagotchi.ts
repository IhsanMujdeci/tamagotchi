import { Model } from "./model";
import { Statistic } from "./statistic";
import { LifeCycleEnum } from "./lifecycle";

export interface UserInterfacer {
    feed(): void,
    clearEvents(): void,
    poop(): void,
    sleep(): void
}

export enum TamagotchiErrors{
    AGE_TO_SMALL="Age too small"
}

export class Tamagotchi implements UserInterfacer{

    happiness: Statistic;
    sleepiness: Statistic;
    hunger: Statistic;
    poopLevel: Statistic;
    weight: Statistic;
    health: Statistic;

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

    sleep(): void {
        if (this.sleepiness.getValue() > 7) {
            this.events.push("Fast asleep ZzZZ...");
            this.happiness.increment(5);
            this.sleepiness.reset()
        } else {
            this.events.push("I dont need any rest!")
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

    setName(name: string){
        this.tamagotchi.name = name
    }
    getName(){
        return this.tamagotchi.name;
    }

    getAge() {
        return this.tamagotchi.age
    }

    setAge(age: number){
        if(age < 0){
            throw new RangeError(TamagotchiErrors.AGE_TO_SMALL)
        }
        this.tamagotchi.age = age
    }

    getLastUpdated(){
        return this.tamagotchi.lastUpdated
    }

    update(){
        this.tamagotchi.lastUpdated = new Date();
    }

    getLifeCycle(){
        return this.tamagotchi.lifeCycle
    }

    setLifeCycle(lifeCycle: LifeCycleEnum){
        this.tamagotchi.lifeCycle = lifeCycle
    }

    isLifeCycle(lifeCycle: LifeCycleEnum){
        return this.tamagotchi.lifeCycle === lifeCycle
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