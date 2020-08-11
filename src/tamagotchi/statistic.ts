export class Statistic {

    private value: number = 5;

    private readonly max = 10;
    private readonly min = 0;

    constructor(newValue? :number) {
        if(newValue){
            this.value = newValue
        }
    }

    increment(inc: number = 1){
        if(!this.isMax()){
            let newValue = this.value + inc;
            if(newValue > this.max){
                newValue = this.max
            }
            this.value = newValue
        }
    }

    decrement(dec: number = 1){
        if(!this.isMin()){
            let newValue = this.value - dec;
            if(newValue < this.min){
                newValue = this.min
            }
            this.value = newValue
        }
    }

    isMax(): boolean {
        return this.value === this.max
    }

    isMin(): boolean {
        return this.value === this.min
    }

    getValue(): number{
        return this.value
    }

    reset(){
        this.value = this.min
    }
}