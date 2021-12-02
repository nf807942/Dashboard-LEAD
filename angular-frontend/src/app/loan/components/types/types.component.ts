import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, HiddenQuestion, TextboxQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Type } from '../../models/type';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new TextboxQuestion({
      key: 'label',
      label: 'TABLE.LABEL',
      required: true
    }),
    new HiddenQuestion({
      key: 'id',
    }),
  ];

  createAction = this.createEditDeleteDialogService.buildCreateAction(this.questions);
  patchAction = this.createEditDeleteDialogService.buildEditAction(this.questions);
  deleteAction = this.createEditDeleteDialogService.buildDeleteAction(this.questions);

  columns: CustomColumn[] = [
    {name: 'TABLE.LABEL', property: 'label'},
    {name: 'TABLE.EDIT', property: 'edit', button: true, buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
    {name: 'TABLE.DELETE', property: 'delete', button: true, buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action},
  ];

  types: Observable<Type[]> = null;

  constructor(
    private loanService: LoanService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.types = this.loanService.getTypes();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.TYPES';

    this.createAction.subject.subscribe((data) => {
      if(data != null) {
        this.loanService.putType(data).subscribe(this.loanService.api.putTableUpdate(this.table));
      }
    });

    this.patchAction.subject.subscribe((data) => {
      if(data != null) {
        this.loanService.patchType(data).subscribe(this.loanService.api.patchTableUpdate(this.table));
      }
    });

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.loanService.deleteType(data).subscribe(this.loanService.api.deleteTableUpdate(this.table));
      }
    });
  }
}
