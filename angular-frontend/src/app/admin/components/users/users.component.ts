import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion, DropdownQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { User } from 'src/app/shared/services/connection.service';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new TextboxQuestion({ key: 'name', label: 'TABLE.USER-NAME', required: true }),
    new TextboxQuestion({ key: 'email', label: 'TABLE.USER-EMAIL', required: true, type: 'email' }),
    new DropdownQuestion({
      key: 'role_id',
      label: 'TABLE.USER-ROLE',
      options_observable: this.adminService.getRoles(),
      options_observable_key: 'id',
      options_observable_value: 'label',
      required: true
    }),
    new TextboxQuestion({ key: 'password', label: 'TABLE.USER-PASSWORD', required: true, type: 'password' }),
    new HiddenQuestion({
      key: 'id',
    }),
  ];
  createAction = this.createEditDeleteDialogService.buildCreateAction(this.questions);
  patchAction = this.createEditDeleteDialogService.buildEditAction(this.questions);
  deleteAction = this.createEditDeleteDialogService.buildDeleteAction(this.questions);

  roleCalculed = (user: User) => ('ROLE.' + user.role.label);

  columns: CustomColumn[] = [
    {name: 'TABLE.USER-NAME', property: 'name'},
    {name: 'TABLE.USER-EMAIL', property: 'email'},
    {name: 'TABLE.USER-ROLE', property: 'role', calculatedProperty: this.roleCalculed, translated: true},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
      {buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action}
    ]},
  ];

  users: Observable<User[]> = null;

  constructor(
    private adminService: AdminService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.users = this.adminService.getUsers();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.ADMIN.USERS';

    this.createAction.subject.subscribe((data) => {
      if(data != null) {
        this.adminService.registerUser(data).subscribe(this.adminService.api.putTableUpdate(this.table));
      }
    });

    this.patchAction.subject.subscribe((data) => {
      if(data != null) {
        this.adminService.patchUser(data).subscribe(this.adminService.api.patchTableUpdate(this.table));
      }
    });

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.adminService.deleteUser(data).subscribe(this.adminService.api.deleteTableUpdate(this.table));
      }
    });
  }

}
