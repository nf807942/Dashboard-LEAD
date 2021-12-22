import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExperimentService } from 'src/app/experiment/services/experiment.service';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion, RowQuestion, DisplayQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Experiment } from '../../models/experiment';
import { SharingDialogComponent } from '../dialogs/sharing-dialog/sharing-dialog.component';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new DisplayQuestion({ key: 'title', label: 'TABLE.EXPERIMENT-TITLE' }),
    new DisplayQuestion({ key: 'description', label: 'TABLE.EXPERIMENT-DESCRIPTION', required: true }),
    new DisplayQuestion({ key: 'duration', label: 'TABLE.EXPERIMENT-DURATION', required: true }),
    new RowQuestion({
      rows: [
        new DisplayQuestion({ key: 'min_subjects', label: 'TABLE.EXPERIMENT-MIN-SUBJECTS', required: true, type: 'number', value: 1 }),
        new DisplayQuestion({ key: 'max_subjects', label: 'TABLE.EXPERIMENT-MAX-SUBJECTS', required: true, type: 'number', value: 1 })
      ]
    }),
    new RowQuestion({
      rows: [
        new DisplayQuestion({ key: 'start_date', label: 'TABLE.EXPERIMENT-START-DATE', required: true, type: 'date' }),
        new DisplayQuestion({ key: 'end_date', label: 'TABLE.EXPERIMENT-END-DATE', required: true, type: 'date' })
      ]
    }),
    new HiddenQuestion({
      key: 'id',
    }),
  ];

  patchAction = this.createEditDeleteDialogService.buildBlankAction();
  deleteAction = this.createEditDeleteDialogService.buildDeleteAction(this.questions);
  QRAction = this.createEditDeleteDialogService.buildDialogAction(SharingDialogComponent);
  reservationAction = this.createEditDeleteDialogService.buildBlankAction();

  columns: CustomColumn[] = [
    {name: 'TABLE.EXPERIMENT-TITLE', property: 'title'},
    {name: 'TABLE.EXPERIMENT-DURATION', property: 'duration'},
    {name: 'TABLE.EXPERIMENT-INSCRIPTIONS', property: 'subjects'},
    {name: 'TABLE.EXPERIMENT-EXPERIMENTALIST', property: 'experimentalist_name'},
    {name: 'TABLE.EXPERIMENT-START-DATE', property: 'start_date', type: 'date'},
    {name: 'TABLE.EXPERIMENT-END-DATE', property: 'end_date', type: 'date'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonIcon: 'search', buttonText: 'EXPERIMENT.INSCRIPTIONS', buttonAction: this.reservationAction.action},
      {buttonIcon: 'share', buttonText: 'EXPERIMENT.SHARING', buttonAction: this.QRAction.action},
      {buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
      {buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action}
    ]},
  ];

  experiments: Observable<Experiment[]> = null;

  constructor(
    private router: Router,
    private experimentService: ExperimentService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.experiments = this.experimentService.getExperiments();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.EXPERIMENT.EXPERIMENTS';

    this.reservationAction.subject.subscribe((data) => this.router.navigate(['experiment/inscriptions/'+data.id]));

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.experimentService.deleteExperiment(data).subscribe(this.experimentService.api.deleteTableUpdate(this.table));
      }
    });
  }

}
