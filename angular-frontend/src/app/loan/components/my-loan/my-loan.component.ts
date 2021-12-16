import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, DisplayQuestion, HiddenQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan.service';
import { ProlongationDialogComponent } from '../dialogs/prolongation-dialog/prolongation-dialog.component';

@Component({
  selector: 'app-my-loan',
  templateUrl: './my-loan.component.html',
  styleUrls: ['./my-loan.component.scss']
})
export class MyLoanComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new DisplayQuestion({ key: 'resource_name', label: 'TABLE.LOAN-REQUEST-RESOURCE' }),
    new DisplayQuestion({ key: 'start_date', label: 'TABLE.LOAN-REQUEST-START-DATE', type: 'date' }),
    new DisplayQuestion({ key: 'end_date', label: 'TABLE.LOAN-REQUEST-END-DATE', type: 'date' }),
    new HiddenQuestion({ key: 'resource_id' }),
    new HiddenQuestion({ key: 'id' }),
  ];

  prolongationAction = this.createEditDeleteDialogService.buildDialogAction(ProlongationDialogComponent, 'warn', 'TABLE.LOAN-CANCEL', 'LOAN.CANCEL-DIALOG-TITLE');
  returnAction = this.createEditDeleteDialogService.buildDisplayAction(this.questions, 'primary', 'TABLE.LOAN-ASK-RETURN', 'LOAN.RETURN-DIALOG-TITLE');

  columns: CustomColumn[] = [
    {name: 'TABLE.LOAN-REQUEST-RESOURCE', property: 'resource_name'},
    {name: 'TABLE.LOAN-REQUEST-START-DATE', property: 'start_date', type: 'date'},
    {name: 'TABLE.LOAN-REQUEST-END-DATE', property: 'end_date', type: 'date'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonIcon: 'more_time', buttonText: 'TABLE.LOAN-ASK-PROLONGATION', buttonAction: this.prolongationAction.action},
      {buttonColor: 'primary', buttonIcon: 'done', buttonText: 'TABLE.LOAN-ASK-RETURN', buttonAction: this.returnAction.action}
    ]}
  ];

  loans$: Observable<Loan[]> = null;

  constructor(
    private loanService: LoanService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.loans$ = this.loanService.getMyLoans();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.MY-LOANS';

    this.prolongationAction.subject.subscribe((data) => {
      if (data !== null) {
        this.loanService.prolongateLoan(data).subscribe(() => {});
      }
    });

    this.returnAction.subject.subscribe((data) => {
      if (data !== null) {
        this.loanService.returnLoan(data).subscribe(() => {});
      }
    });
  }

}
