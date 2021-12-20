import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { DynamicFormQuestion, TextboxQuestion, RowQuestion, TextAreaQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { BeforeAfterValidator, DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

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
        new TextboxQuestion({ key: 'max_subjects', label: 'TABLE.EXPERIMENT-MAN-SUBJECTS', required: true, type: 'number', value: 1 })
      ]
    }),
  ];

  secondFormGroup: FormGroup;
  date: Date;

  timeSlots = [];

  constructor(
    private fb: FormBuilder,
    private crossComponentService: CrossComponentService,
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
        
        slots.push({start: (hourStart * 60) + i * duration, end: (hourStart * 60) + (i + 1) * (duration)})
      }
      this.timeSlots.push({day: day, slots: slots});
    });
  }

  createExperiment(): void {

  }

  remove(day: any, slot: string): void {
    const index = day.slots.indexOf(slot);

    if (index >= 0) {
      day.slots.splice(index, 1);
    }
  }

  formatSlot(slot: any): string {
    return this.formatHour(slot.start) + ' - ' +this.formatHour(slot.end);
  }

  formatHour(time: number): string {
    let hour = this.addZeroIfSub10(Math.floor(time / 60));
    let minute = this.addZeroIfSub10(time % 60);

    return hour + 'h' + minute;
  }

  addZeroIfSub10(str: number): string {
    return (str < 10) ? '0' + str : str + '';
  }

}