import { User } from "src/app/shared/services/connection.service";
import { TimeSlot } from "./time-slot";

export class Experiment {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    min_subjects: number;
    max_subjects: number;
    experimentalist: User;
    duration: number;
    experiment_time_slots: TimeSlot[];

    constructor(data: Partial<Experiment>){
        Object.assign(this, data);
    }

    get experimentalist_name(): string {
        return this.experimentalist.name;
    }
}
