import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    return this.form.getRawValue();
  }

  get loading(): boolean {
    return this.qsts_array.findIndex(qst => qst.loading === true) !== -1;
  }
}