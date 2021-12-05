import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperimentService } from 'src/app/experiment/services/experiment.service';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion, RowQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Experiment } from '../../models/experiment';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new TextboxQuestion({ key: 'title', label: 'TABLE.EXPERIMENT-TITLE', required: true }),
    new TextboxQuestion({ key: 'description', label: 'TABLE.EXPERIMENT-DESCRIPTION', required: true }),
    new TextboxQuestion({ key: 'time', label: 'TABLE.EXPERIMENT-TIME', required: true }),
    new RowQuestion({
      rows: [
        new TextboxQuestion({ key: 'min_subjects', label: 'TABLE.EXPERIMENT-MIN-SUBJECTS', required: true, type: 'number' }),
        new TextboxQuestion({ key: 'max_subjects', label: 'TABLE.EXPERIMENT-MAN-SUBJECTS', required: true, type: 'number' })
      ]
    }),
    new TextboxQuestion({ key: 'experimentalist', label: 'TABLE.EXPERIMENT-EXPERIMENTALIST', required: true }),
    new RowQuestion({
      rows: [
        new TextboxQuestion({ key: 'start_date', label: 'TABLE.EXPERIMENT-START-DATE', required: true, type:"date" }),
        new TextboxQuestion({ key: 'end_date', label: 'TABLE.EXPERIMENT-END-DATE', required: true, type:"date" })
      ]
    }),
    new HiddenQuestion({
      key: 'id',
    }),
  ];

  createAction = this.createEditDeleteDialogService.buildCreateAction(this.questions);
  patchAction = this.createEditDeleteDialogService.buildEditAction(this.questions);
  deleteAction = this.createEditDeleteDialogService.buildDeleteAction(this.questions);

  columns: CustomColumn[] = [
    {name: 'TABLE.EXPERIMENT-TITLE', property: 'title'},
    {name: 'TABLE.EXPERIMENT-DESCRIPTION', property: 'description'},
    {name: 'TABLE.EXPERIMENT-TIME', property: 'time'},
    {name: 'TABLE.EXPERIMENT-MIN-SUBJECTS', property: 'min_subjects'},
    {name: 'TABLE.EXPERIMENT-MAN-SUBJECTS', property: 'max_subjects'},
    {name: 'TABLE.EXPERIMENT-EXPERIMENTALIST', property: 'experimentalist'},
    {name: 'TABLE.EXPERIMENT-START-DATE', property: 'start_date'},
    {name: 'TABLE.EXPERIMENT-END-DATE', property: 'end_date'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
      {buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action}
    ]},
  ];

  experiments: Observable<Experiment[]> = null;

  constructor(
    private experimentService: ExperimentService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.experiments = this.experimentService.getExperiments();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.EXPERIMENT.EXPERIMENTS';

    this.createAction.subject.subscribe((data) => {
      if(data != null) {
        this.experimentService.putExperiment(data).subscribe(this.experimentService.api.putTableUpdate(this.table));
      }
    });

    this.patchAction.subject.subscribe((data) => {
      if(data != null) {
        this.experimentService.patchExperiment(data).subscribe(this.experimentService.api.patchTableUpdate(this.table));
      }
    });

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.experimentService.deleteExperiment(data).subscribe(this.experimentService.api.deleteTableUpdate(this.table));
      }
    });
  }

}
