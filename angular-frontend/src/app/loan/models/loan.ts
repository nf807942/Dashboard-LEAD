import { User } from "src/app/shared/services/connection.service";
import { Resource } from "./resource";

export class Loan {
    id: number;
    resource_id: Resource;
    user_id: User;
    user: User;
    resource: Resource;

    constructor(data: Partial<Loan>){
        Object.assign(this, data);
    }

    get applicant(): string {
        return this.user.name;
    }

    get resource_name(): string {
        return this.resource.name;
    }
}
