import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { LoanRequest } from '../../models/loan-request';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.scss']
})
export class LoanRequestsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  acceptAction = this.createEditDeleteDialogService.buildBlankAction();
  rejectAction = this.createEditDeleteDialogService.buildBlankAction();

  columns: CustomColumn[] = [
    {name: 'TABLE.LOAN-REQUEST-USER', property: 'applicant'},
    {name: 'TABLE.LOAN-REQUEST-RESOURCE', property: 'resource_name'},
    {name: 'TABLE.LOAN-REQUEST-TYPE', property: 'request_type_name', translated: true},
    {name: 'TABLE.LOAN-REQUEST-START-DATE', property: 'start_date', type: 'date'},
    {name: 'TABLE.LOAN-REQUEST-END-DATE', property: 'end_date', type: 'date'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'primary', buttonIcon: 'done', buttonText: 'TABLE.LOAN-REQUEST-ACCEPT', buttonAction: this.acceptAction.action},
      {buttonColor: 'warn', buttonIcon: 'cancel', buttonText: 'TABLE.LOAN-REQUEST-REJECT', buttonAction: this.rejectAction.action}
    ]},
  ];

  requests$: Observable<LoanRequest[]> = null;

  constructor(
    private loanService: LoanService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.requests$ = this.loanService.getLoanRequests();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.MANAGE-REQUESTS';

    this.acceptAction.subject.subscribe((data) => {
      this.loanService.acceptLoanRequest(data).subscribe(this.loanService.api.deleteTableUpdate(this.table)(data));
    });

    this.rejectAction.subject.subscribe((data) => {
      this.loanService.rejectLoanRequest(data).subscribe(this.loanService.api.deleteTableUpdate(this.table));
    });
  }
}
