import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion, DropdownQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Resource } from '../../models/resource';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new TextboxQuestion({
      key: 'name',
      label: 'TABLE.NAME',
      required: true
    }),
    new DropdownQuestion({
      key: 'type_id',
      label: 'TABLE.TYPE-NAME',
      options_observable: this.loanService.getTypes(),
      options_observable_key: 'id',
      options_observable_value: 'label',
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
    {name: 'TABLE.NAME', property: 'name'},
    {name: 'TABLE.TYPE-NAME', property: 'type', subproperty: 'label'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
      {buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action}
    ]},
  ];

  resources: Observable<Resource[]> = null;

  constructor(
    private loanService: LoanService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.resources = this.loanService.getResources();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.RESOURCES';

    this.createAction.subject.subscribe((data) => {
      if(data != null) {
        this.loanService.putResource(data).subscribe(this.loanService.api.putTableUpdate(this.table));
      }
    });

    this.patchAction.subject.subscribe((data) => {
      if(data != null) {
        this.loanService.patchResource(data).subscribe(this.loanService.api.patchTableUpdate(this.table));
      }
    });

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.loanService.deleteResource(data).subscribe(this.loanService.api.deleteTableUpdate(this.table));
      }
    });

  }
}
