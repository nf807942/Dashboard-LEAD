import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { DynamicFormQuestion, DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, AfterViewInit {

  @ViewChildren('qst') qsts: QueryList<DynamicFormQuestionComponent>;
  qsts_array: DynamicFormQuestionComponent[] = [];

  @Input() questions: DynamicFormQuestion[] | null = [];
  form!: FormGroup;

  constructor(
    private dfs: DynamicFormService,
  ) {
  }

  ngOnInit() {
    this.form = this.dfs.toFormGroup(this.questions as DynamicFormQuestion[]);
  }

  ngAfterViewInit(){
    this.qsts_array = this.qsts.toArray();
  }

  get value(): any {
    this.questions.forEach(question => {
      this.parseInt(question);
      if(question.isRow) {
        question.rows.forEach(row => this.parseInt(row));
      }
    })

    return this.form.getRawValue();
  }

  get loading(): boolean {
    return this.qsts_array.findIndex(qst => qst.loading === true) !== -1;
  }

  parseInt(question): void {
    if(question.type === 'number') {
      this.form.controls[question.key].setValue(parseInt(this.form.controls[question.key].value));
    }
  }

  get valid(): boolean {
    return this.form.valid;
  }
}

export const BeforeAfterValidator = (group: FormGroup): ValidationErrors => {
  const control1 = group.controls['hourStart'];
  const control2 = group.controls['hourEnd'];
  if (control1.value >= control2.value) {
    control1.setErrors({beforeAfter: true});
    control2.setErrors({beforeAfter: true});
  } else {
     control1.setErrors(null);
     control2.setErrors(null);
  }
  return;
};