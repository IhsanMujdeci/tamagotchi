import {string} from "../string";

export class Clock{

    hour = 0;
    minute = 0;
    day = 0;

    // returns number of days past for minute increment
    incrementMinute(inc: number) {
        let newMin = this.minute + inc;
        const additionalHours =  Math.floor(newMin / 60);
        newMin = newMin - additionalHours * 60;
        this.minute = newMin;
        this.incrementHour(additionalHours)
    }

    // returns number of days past for hour increment
    incrementHour(inc: number){
        let newHour = this.hour + inc;
        const additionalDays =  Math.floor( newHour/ 24);
        newHour = newHour - additionalDays * 24;
        this.hour = newHour;
        this.day = this.day + additionalDays
    }

    getMinute(){
        return this.minute
    }

    getDay(){
        return this.day
    }

    getHour(){
        return this.hour
    }

    toString(){
        return `Day: ${this.getDay()} | Time ${string.doubleDigitFill(this.getHour())}:${string.doubleDigitFill(this.getMinute())}`
    }
}