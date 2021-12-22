import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, DisplayQuestion, RowQuestion, HiddenQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { TimeSlot } from '../../models/time-slot';
import { ExperimentService } from '../../services/experiment.service';

@Component({
  selector: 'app-experiment-inscriptions',
  templateUrl: './experiment-inscriptions.component.html',
  styleUrls: ['./experiment-inscriptions.component.scss']
})
export class ExperimentInscriptionsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  id: number;
  questions: DynamicFormQuestion[] = [
    new DisplayQuestion({ key: 'email', label: 'TABLE.EXPERIMENT-SUBJECT-EMAIL' }),
    new DisplayQuestion({ key: 'hour', label: 'TABLE.EXPERIMENT-SUBJECT-HOUR', required: true }),
    new HiddenQuestion({
      key: 'id',
    }),
  ];

  unubscribeAction = this.createEditDeleteDialogService.buildDisplayAction(this.questions, 'warn', 'EXPERIMENT.UNSUBSCRIBE', 'EXPERIMENT.UNSUBSCRIBE-DIALOG-TITLE');

  columns: CustomColumn[] = [
    {name: 'TABLE.EXPERIMENT-SUBJECT-EMAIL', property: 'email'},
    {name: 'TABLE.EXPERIMENT-SUBJECT-HOUR', property: 'hour'},
    {name: 'TABLE.ACTIONS', property: 'actions', button: true, buttons: [
      {buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'EXPERIMENT.UNSUBSCRIBE', buttonAction: this.unubscribeAction.action},
    ]},
  ];

  inscriptions: Observable<TimeSlot[]> = null;

  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  
    this.inscriptions = this.experimentService.getInscriptions(this.id);
  }
  
  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.EXPERIMENT.INSCRIPTIONS';

    this.unubscribeAction.subject.subscribe((data) => {
      if(data != null) {
        this.experimentService.unsubscribe(data).subscribe(this.experimentService.api.deleteTableUpdate(this.table));
      }
    });
  }
}
