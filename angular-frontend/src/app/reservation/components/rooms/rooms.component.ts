import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion, DropdownQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Room } from '../../models/room';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new TextboxQuestion({
      key: 'number',
      label: 'TABLE.ROOM-NUMBER',
      type: 'number',
      required: true
    }),
    new TextboxQuestion({
      key: 'floor',
      label: 'TABLE.ROOM-FLOOR',
      type: 'number',
      required: true
    }),
    new DropdownQuestion({
      key: 'building_id',
      label: 'TABLE.BUILDING-NAME',
      options_observable: this.reservationService.getBuildings(),
      options_observable_key: 'id',
      options_observable_value: 'name',
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
    {name: 'TABLE.ROOM-NUMBER', property: 'number'},
    {name: 'TABLE.ROOM-FLOOR', property: 'floor'},
    {name: 'TABLE.BUILDING-NAME', property: 'building', subproperty: 'name'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
      {buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action}
    ]},
  ];

  rooms: Observable<Room[]> = null;

  constructor(
    private reservationService: ReservationService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.rooms = this.reservationService.getRooms();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.RESERVATION.ROOMS';

    this.createAction.subject.subscribe((data) => {
      if(data != null) {
        this.reservationService.putRoom(data).subscribe(this.reservationService.api.putTableUpdate(this.table));
      }
    });

    this.patchAction.subject.subscribe((data) => {
      if(data != null) {
        this.reservationService.patchRoom(data).subscribe(this.reservationService.api.patchTableUpdate(this.table));
      }
    });

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.reservationService.deleteRoom(data).subscribe(this.reservationService.api.deleteTableUpdate(this.table));
      }
    });
  }

}
