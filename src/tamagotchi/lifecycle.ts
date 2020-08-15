export enum LifeCycleEnum {
    EGG = 'egg',
    BABY = 'baby',
    CHILD= 'child',
    TEENAGER = 'teenager',
    ADULT= 'adult',
    DEAD = 'dead'
}

export class LifeCycle{

    public static readonly adultAge = 21;
    public static readonly teenageAge = 12;
    public static readonly childAge = 5;
    public static readonly babyAge = 2.5;

    static ageToLifeCycle(age: number): LifeCycleEnum{
        if (age > LifeCycle.adultAge) {
            return LifeCycleEnum.ADULT
        }
        if (age > LifeCycle.teenageAge) {
            return LifeCycleEnum.TEENAGER
        }
        if (age > LifeCycle.childAge) {
            return LifeCycleEnum.CHILD
        }
        if (age >= LifeCycle.babyAge) {
            return LifeCycleEnum.BABY
        }
        return LifeCycleEnum.EGG;
    }

}