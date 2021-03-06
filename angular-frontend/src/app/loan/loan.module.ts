import { NgModule } from '@angular/core';
import { AddLoanComponent } from './components/add-loan/add-loan.component';
import { MyLoanComponent } from './components/my-loan/my-loan.component';
import { TypesComponent } from './components/types/types.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { LoansComponent } from './components/loans/loans.component';
import { LoanRequestsComponent } from './components/loan-requests/loan-requests.component';
import { LoanTemplateComponent } from './components/loan-template/loan-template.component';
import { SharedModule } from '../shared/shared.module';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { ProlongationDialogComponent } from './components/dialogs/prolongation-dialog/prolongation-dialog.component';



@NgModule({
  declarations: [
    AddLoanComponent,
    MyLoanComponent,
    TypesComponent,
    ResourcesComponent,
    LoansComponent,
    LoanRequestsComponent,
    LoanTemplateComponent,
    MyRequestsComponent,
    ProlongationDialogComponent
  ],
  imports: [
    SharedModule
  ]
})
export class LoanModule { }
