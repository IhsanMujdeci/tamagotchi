import {LifeCycleEnum} from "./lifecycle";

export type Model = {
    lifeCycle: LifeCycleEnum,
    health: number,
    happiness: number,
    age: number,
    weight: number,
    hunger: number,
    sleepiness: number,
    createdAt: Date,
    lastUpdated: Date,
    poop: number
    name: string
}