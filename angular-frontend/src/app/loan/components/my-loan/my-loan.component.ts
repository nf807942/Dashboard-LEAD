import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-my-loan',
  templateUrl: './my-loan.component.html',
  styleUrls: ['./my-loan.component.scss']
})
export class MyLoanComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  acceptAction = this.createEditDeleteDialogService.buildBlankAction();
  rejectAction = this.createEditDeleteDialogService.buildBlankAction();

  columns: CustomColumn[] = [
    {name: 'TABLE.LOAN-REQUEST-RESOURCE', property: 'resource_name'},
    {name: 'TABLE.LOAN-REQUEST-START-DATE', property: 'start_date', type: 'date'},
    {name: 'TABLE.LOAN-REQUEST-END-DATE', property: 'end_date', type: 'date'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonIcon: 'more_time', buttonText: 'TABLE.LOAN-ASK-PROLONGATION', buttonAction: this.acceptAction.action},
      {buttonColor: 'primary', buttonIcon: 'done', buttonText: 'TABLE.LOAN-ASK-RETURN', buttonAction: this.rejectAction.action}
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
  }

}
