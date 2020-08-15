export enum StatisticErrors{
    TO_HIGH= "Initial value to high",
    TO_LOW="Initial value to low"
}

export class Statistic {

    private value: number = 5;

    static readonly max = 10;
    static readonly min = 0;

    constructor(newValue? :number) {

        if(newValue || newValue === 0){
            if(newValue > Statistic.max){
                throw new RangeError(StatisticErrors.TO_HIGH)
            }
            if(newValue < Statistic.min){
                throw new RangeError(StatisticErrors.TO_LOW)
            }
            this.value = newValue;
        }

    }

    increment(inc: number = 1){
        if(!this.isMax()){
            let newValue = this.value + inc;
            if(newValue > Statistic.max){
                newValue = Statistic.max
            }
            this.value = newValue
        }
    }

    decrement(dec: number = 1){
        if(!this.isMin()){
            let newValue = this.value - dec;
            if(newValue < Statistic.min){
                newValue = Statistic.min
            }
            this.value = newValue
        }
    }

    isMax(): boolean {
        return this.value === Statistic.max
    }

    isMin(): boolean {
        return this.value === Statistic.min
    }

    getValue(): number{
        return this.value
    }

    reset(){
        this.value = Statistic.min
    }
}