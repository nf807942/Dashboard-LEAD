import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, DisplayQuestion, HiddenQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { LoanRequest } from '../../models/loan-request';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new DisplayQuestion({ key: 'resource_name', label: 'TABLE.LOAN-REQUEST-RESOURCE' }),
    new DisplayQuestion({ key: 'request_type_name', label: 'TABLE.LOAN-REQUEST-TYPE', translated: true }),
    new DisplayQuestion({ key: 'start_date', label: 'TABLE.LOAN-REQUEST-START-DATE', type: 'date' }),
    new DisplayQuestion({ key: 'end_date', label: 'TABLE.LOAN-REQUEST-END-DATE', type: 'date' }),
    new HiddenQuestion({ key: 'id' })
  ];

  rejectAction = this.createEditDeleteDialogService.buildDisplayAction(this.questions, 'warn', 'TABLE.LOAN-REQUEST-CANCEL', 'LOAN.CANCEL-REQUEST-DIALOG-TITLE');

  columns: CustomColumn[] = [
    {name: 'TABLE.LOAN-REQUEST-USER', property: 'applicant'},
    {name: 'TABLE.LOAN-REQUEST-RESOURCE', property: 'resource_name'},
    {name: 'TABLE.LOAN-REQUEST-TYPE', property: 'request_type_name', translated: true},
    {name: 'TABLE.LOAN-REQUEST-START-DATE', property: 'start_date', type: 'date'},
    {name: 'TABLE.LOAN-REQUEST-END-DATE', property: 'end_date', type: 'date'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'warn', buttonIcon: 'cancel', buttonText: 'TABLE.LOAN-REQUEST-CANCEL', buttonAction: this.rejectAction.action}
    ]},
  ];

  requests$: Observable<LoanRequest[]> = null;

  constructor(
    private loanService: LoanService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.requests$ = this.loanService.getMyLoanRequests();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.MY-REQUESTS';

    this.rejectAction.subject.subscribe((data) => {
      if (data !== null) {
        this.loanService.cancelMyLoanRequest(data).subscribe(this.loanService.api.deleteTableUpdate(this.table));
      }
    });
  }

}
