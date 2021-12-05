import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question!: DynamicFormQuestion;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  loading: boolean = false;
  observable_values: any[];

  constructor(
  ) {}

  ngOnInit(): void {
    if(this.question.options_observable) {
      this.loading = true;
      this.question.options_observable.subscribe((data) => {
        this.loading = false;
        this.observable_values = data;
      })
    } else {
      this.loading = false;
    }
  }
}

export class DynamicFormQuestion {
  value: any;
  key: string;
  label: string;
  required: boolean;
  disabled: boolean;
  hint: string;
  icon: string;
  order: number;
  controlType: string;
  type: string;
  hidden: boolean;

  options: {key: string, value: string}[];
  options_observable: Observable<any[]>;
  options_observable_key: string;
  options_observable_value: string;

  isRow: boolean;
  rows: DynamicFormQuestion[];

  constructor(options: {
          value?: any;
          key?: string;
          label?: string;
          required?: boolean;
          disabled?: boolean;
          hint?: string;
          icon?: string;
          order?: number;
          controlType?: string;
          type?: string;
          hidden?: boolean;

          options?: {key: string, value: string}[];
          options_observable?: Observable<any[]>;
          options_observable_key?: string;
          options_observable_value?: string;

          isRow?: boolean;
          rows?: DynamicFormQuestion[];
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.disabled = options.disabled || false;
      this.hint = options.hint || '';
      this.icon = options.icon || '';
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.hidden = options.hidden || false;

      this.options = options.options || [];
      this.options_observable = options.options_observable || null;
      this.options_observable_key = options.options_observable_key || '';
      this.options_observable_value = options.options_observable_value || '';

      this.isRow = options.isRow || false;
      this.rows = options.rows || [];
  }
}

export class TextboxQuestion extends DynamicFormQuestion {
  override controlType = 'textbox';
}

export class DropdownQuestion extends DynamicFormQuestion {
  override controlType = 'dropdown';
}

export class HiddenQuestion extends DynamicFormQuestion {
  override hidden = true;
}

export class RowQuestion extends DynamicFormQuestion {
  override isRow = true;
}