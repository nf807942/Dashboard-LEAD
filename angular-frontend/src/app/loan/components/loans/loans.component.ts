import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  columns: CustomColumn[] = [
    {name: 'TABLE.LOAN-REQUEST-USER', property: 'applicant'},
    {name: 'TABLE.LOAN-REQUEST-RESOURCE', property: 'resource_name'},
    {name: 'TABLE.LOAN-REQUEST-START-DATE', property: 'start_date', type: 'date'},
    {name: 'TABLE.LOAN-REQUEST-END-DATE', property: 'end_date', type: 'date'},
  ];

  loans$: Observable<Loan[]> = null;

  constructor(
    private loanService: LoanService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.loans$ = this.loanService.getLoans();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.LOANS';
  }
}
