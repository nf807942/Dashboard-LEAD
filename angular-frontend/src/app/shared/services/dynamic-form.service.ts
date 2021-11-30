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

    questions.forEach(question => {
      let value = question.value || '';
      group[question.key] = question.required ? new FormControl({value:value, disabled: question.disabled}, Validators.required)
                                              : new FormControl({value:value, disabled: question.disabled});
    });
    return new FormGroup(group);
  }
}
