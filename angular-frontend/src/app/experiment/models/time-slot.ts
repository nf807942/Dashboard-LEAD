import * as moment from "moment";
import { Moment } from "moment";

export class TimeSlot {
    id: number;
    start: Moment;
    end: Moment
    email?: string;

    constructor(data: Partial<TimeSlot>){
        Object.assign(this, data);

        this.start = moment(this.start);
        this.end = moment(this.end);
    }

    get hour(): string {
        return this.start.format('dddd DD MMMM YYYY, HH:mm');
    }
}

export class DaySlots {
    day: Moment;
    slots: TimeSlot[];
}
