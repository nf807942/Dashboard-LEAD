import { User } from "src/app/shared/services/connection.service";
import { Resource } from "./resource";

export class LoanRequest {
    id: number;
    resource_id: Resource;
    user_id: User;
    request_type: number;
    user: User;
    resource: Resource;

    constructor(data: Partial<LoanRequest>){
        Object.assign(this, data);
    }

    get request_type_name(): string {
        switch (this.request_type) {
            case 0:
                return 'LOAN.LOAN-REQUEST';
            case 1:
                return 'LOAN.PROLONGATION-REQUEST';
            case 2:
                return 'LOAN.RETURN-REQUEST';
        }
    }

    get applicant(): string {
        return this.user.name;
    }

    get resource_name(): string {
        return this.resource.name;
    }
}
