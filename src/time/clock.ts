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
        const displayHour = this.hour < 10 ? "0"+ this.hour : this.hour;
        const displayMinute = this.minute < 10 ? "0"+ this.minute : this.minute;
        return `Day: ${this.day} | Time ${displayHour}:${displayMinute}`
    }
}