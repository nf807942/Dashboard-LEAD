import { Loan } from "./loan";
import { Type } from "./type";
export class Resource {
    id: number;
    name: string;
    type_id: number;
    type: Type;
    loans: Loan[];

    get available(): string {
        return this.loans?.length === 0 ? 'APP.YES' : 'APP.NO';
    }

    constructor(data: Partial<Resource>){
        Object.assign(this, data);
    }
}
