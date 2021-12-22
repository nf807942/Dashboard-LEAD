import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DynamicFormQuestion, TextboxQuestion, RowQuestion, TextAreaQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { BeforeAfterValidator, DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { ExperimentService } from '../../services/experiment.service';

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false, showError: true},
    },
  ],
})
export class CreateExperimentComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('firstFormGroup') firstFormGroup: DynamicFormComponent;

  informations: DynamicFormQuestion[] = [
    new TextboxQuestion({ key: 'title', label: 'TABLE.EXPERIMENT-TITLE', required: true }),
    new TextAreaQuestion({ key: 'description', label: 'TABLE.EXPERIMENT-DESCRIPTION', required: true }),
    new TextboxQuestion({ key: 'duration', label: 'TABLE.EXPERIMENT-DURATION', required: true, type: 'number', value: 60}),
    new RowQuestion({
      rows: [
        new TextboxQuestion({ key: 'min_subjects', label: 'TABLE.EXPERIMENT-MIN-SUBJECTS', required: true, type: 'number', value: 1 }),
        new TextboxQuestion({ key: 'max_subjects', label: 'TABLE.EXPERIMENT-MAX-SUBJECTS', required: true, type: 'number', value: 1 })
      ]
    }),
  ];

  secondFormGroup: FormGroup;
  date: Date;

  timeSlots = [];

  constructor(
    private fb: FormBuilder,
    private crossComponentService: CrossComponentService,
    private experimentService: ExperimentService,
    private router: Router
  ) {
    this.secondFormGroup = this.fb.group({
      range: this.fb.group({
        start: this.fb.control({}, {validators: [Validators.required]}),
        end: this.fb.control({}, {validators: [Validators.required]}),
      }),
      weekend: this.fb.control(false, {validators: [Validators.required]}),
      excluded: this.fb.control([], {validators: []}),
      hourStart: this.fb.control(8, {validators: [Validators.required, Validators.max(23), Validators.min(0)]}),
      hourEnd: this.fb.control(17, {validators: [Validators.required, Validators.max(23), Validators.min(0)]}),
    });
    this.secondFormGroup.addValidators(BeforeAfterValidator);
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.EXPERIMENT.CREATE-EXPERIMENT';
    this.date = new Date();
  }

  generateTimeSlots(): void {

    this.timeSlots = [];

    let values = this.secondFormGroup.value;
    let start = values.range.start;
    let end = values.range.end;
    let weekend = values.weekend;
    let hourStart = values.hourStart;
    let hourEnd = values.hourEnd;
    let duration = this.firstFormGroup.value.duration;

    let excluded_days = [];
    this.secondFormGroup.value.excluded.forEach(day => {
      excluded_days.push(moment(day));
    });

    let days = [];
    for (var m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
      if (m.day() === 0 || m.day() === 6) {
        if (weekend && excluded_days.findIndex(day => m.isSame(day, 'day')) === -1) {
          days.push(moment(m));
        }
      } else if(excluded_days.findIndex(day => m.isSame(day, 'day')) === -1) {
        days.push(moment(m));
      }
    }

    let nb_slots = ((hourEnd - hourStart) * 60) / duration;
    
    days.forEach(day => {
      let slots = [];
      for (let i = 0; i < nb_slots; i++) {
        let start = moment(day);
        let end = moment(day);
        start.minutes((hourStart * 60) + i * duration);
        end.minutes((hourStart * 60) + (i + 1) * (duration));
        slots.push({start: start, end: end})
      }
      this.timeSlots.push({day: day, slots: slots});
    });
  }

  createExperiment(): void {
    let formatedTimeSlots = [].concat(...this.timeSlots.map(
      day => day.slots.map(
        slot => {return {start: slot.start.format('YYYY-MM-DD HH:mm:ss'), end: slot.end.format('YYYY-MM-DD HH:mm:ss')};}
      )
    ));
    let value = {...this.firstFormGroup.value, ...this.secondFormGroup.value, timeSlots: formatedTimeSlots};
    value.start_date = moment(value.range.start).format('YYYY-MM-DD');
    value.end_date = moment(value.range.end).format('YYYY-MM-DD');

    this.experimentService.putExperiment(value).subscribe((data) => {
      if (data) {
        this.router.navigate(['/experiment/experiments']);
      }
    });
  }

  remove(day: any, slot: string): void {
    const index = day.slots.indexOf(slot);

    if (index >= 0) {
      day.slots.splice(index, 1);
    }
  }
}