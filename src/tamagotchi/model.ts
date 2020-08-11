import {LifeCycleEnum} from "./lifecycle";

export type Model = {
    lifeCycle: LifeCycleEnum,
    happiness: number,
    age: number,
    weight: number,
    hunger: number,
    sleepiness: number,
    createdAt: Date,
    poop: number
}