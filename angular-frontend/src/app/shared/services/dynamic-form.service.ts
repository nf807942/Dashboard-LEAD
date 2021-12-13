import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DynamicFormQuestion } from '../components/dynamic-form-question/dynamic-form-question.component';


@Injectable({
  providedIn: 'any'
})
export class DynamicFormService {
  constructor() { }

  toFormGroup(questions: DynamicFormQuestion[] ) {
    const group: any = {};

    questions = (questions.sort((a, b) => a.order - b.order));

    questions.filter(question => !question.isRow).forEach(question => {
      this.addQuestion(question, group);
    });
    questions.filter(question => question.isRow).forEach(question => {
      question.rows.forEach(row => {
        this.addQuestion(row, group);
      })
    });

    return new FormGroup(group);
  }

  private addQuestion(qst: DynamicFormQuestion, group: any): void {
    let validators = [
      qst.required ? Validators.required : null,
      qst.type === 'email' ? Validators.email : null,
    ].filter(validator => validator !== null);

    let value = (qst.value != null) ? qst.value : '';
    group[qst.key] = new FormControl({value:value, disabled: qst.disabled}, {validators:validators});
  }
}
