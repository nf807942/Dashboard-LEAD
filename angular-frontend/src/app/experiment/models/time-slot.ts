import { Moment } from "moment";

export class TimeSlot {
    start: Moment;
    end: Moment
}

export class DaySlots {
    day: Moment;
    slots: TimeSlot[];
}
