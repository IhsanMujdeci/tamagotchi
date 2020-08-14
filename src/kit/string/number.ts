export enum DoubleDigitFillError {
    TO_HIGH = "To high of a number to fill",
    TO_LOW = "To low of a number to fill"
}

export function doubleDigitFill(n: number):string{
    if(n > 99){
        throw new RangeError(DoubleDigitFillError.TO_HIGH)
    }
    if(n < 0){
        throw new RangeError(DoubleDigitFillError.TO_LOW)
    }
    return n < 10 ? "0"+ n : n+"";
}