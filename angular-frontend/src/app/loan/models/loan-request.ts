import { User } from "src/app/shared/services/connection.service";
import { Loan } from "./loan";
import { Resource } from "./resource";

export class LoanRequest {
    id: number;
    resource_id: Resource;
    user_id: User;
    request_type: number;
    user: User;
    resource: Resource;
    loan_id: number;
    loan: Loan;
    start_date: Date;
    end_date: Date;

    constructor(data: Partial<LoanRequest>){
        Object.assign(this, data);

        if (this.request_type === 1 || this.request_type === 2) {
            this.resource_id = this.loan.resource_id
            this.resource = this.loan.resource;
            this.user_id = this.loan.user_id;
            this.user = this.loan.user;
            this.start_date = this.loan.start_date
            if (this.request_type === 2) {
                this.end_date = this.loan.end_date
            }
        }
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
