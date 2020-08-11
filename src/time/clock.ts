export class Clock{
    hour = 0;
    minute = 0;

    // returns number of days past for minute increment
    incrementMinute(inc: number): number{
        let newMin = this.minute + inc;
        const additionalHours =  Math.floor(newMin / 60);
        newMin = newMin - additionalHours * 60;
        this.minute = newMin;
        return this.incrementHour(additionalHours)
    }

    // returns number of days past for hour increment
    incrementHour(inc: number): number{
        let newHour = this.hour + inc;
        const additionalDays =  Math.floor( newHour/ 24);
        newHour = newHour - additionalDays * 24;
        this.hour = newHour;
        return additionalDays
    }

    toString(){
        return `${this.hour}:${this.minute}`
    }
}