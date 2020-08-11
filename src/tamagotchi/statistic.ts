export class Statistic {

    private value: number = 5;

    private readonly max = 10;
    private readonly min = 0;

    constructor(newValue? :number) {
        if(newValue){
            this.value = newValue
        }
    }

    increment(){
        if(!this.isMax()){
            this.value ++
        }
    }

    decrement(){
        if(!this.isMin()){
            this.value --
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