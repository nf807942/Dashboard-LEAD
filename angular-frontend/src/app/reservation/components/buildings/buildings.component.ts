import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Building } from '../../models/building';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new TextboxQuestion({
      key: 'name',
      label: 'TABLE.BUILDING-NAME',
      required: true
    }),
    new TextboxQuestion({
      key: 'address',
      label: 'TABLE.BUILDING-ADDRESS',
      required: true
    }),
    new TextboxQuestion({
      key: 'pc',
      label: 'TABLE.BUILDING-PC',
      required: true
    }),
    new TextboxQuestion({
      key: 'city',
      label: 'TABLE.BUILDING-CITY',
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
    {name: 'TABLE.BUILDING-NAME', property: 'name'},
    {name: 'TABLE.BUILDING-ADDRESS', property: 'address'},
    {name: 'TABLE.BUILDING-PC', property: 'pc'},
    {name: 'TABLE.BUILDING-CITY', property: 'city'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
      {buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action}
    ]},
  ];

  buildings: Observable<Building[]> = null;

  constructor(
    private reservationService: ReservationService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.buildings = this.reservationService.getBuildings();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.RESERVATION.BUILDINGS';

    this.createAction.subject.subscribe((data) => {
      if(data != null) {
        this.reservationService.putBuilding(data).subscribe(this.reservationService.api.putTableUpdate(this.table));
      }
    });

    this.patchAction.subject.subscribe((data) => {
      if(data != null) {
        this.reservationService.patchBuilding(data).subscribe(this.reservationService.api.patchTableUpdate(this.table));
      }
    });

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.reservationService.deleteBuilding(data).subscribe(this.reservationService.api.deleteTableUpdate(this.table));
      }
    });
  }
}
