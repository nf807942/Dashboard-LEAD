import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CreateEditDeleteDialogComponent } from '../components/dialogs/create-edit-delete-dialog/create-edit-delete-dialog.component';
import { DynamicFormQuestion } from '../components/dynamic-form-question/dynamic-form-question.component';

@Injectable({
  providedIn: 'root'
})
export class CreateEditDeleteDialogService {

  constructor(
    private dialog: MatDialog
  ) {}

  buildCreateAction(questions: any): {subject: Observable<any>, action: (data?: any) => any} {
    let subject = new Subject<any>();

    let action = this.generateAction(this.copyQuestions(questions), subject, 'primary', 'APP.ADD', 'DIALOG.ADD');

    return {subject, action};
  }

  buildEditAction(questions: any): {subject: Observable<any>, action: (data: any) => any} {
    let subject = new Subject<any>();

    let action = this.generateAction(this.copyQuestions(questions), subject, 'accent', 'APP.UPDATE', 'DIALOG.UPDATE');
    
    return {subject, action};
  }

  buildDeleteAction(questions: any): {subject: Observable<any>, action: (data: any) => any} {
    let subject = new Subject<any>();
    let new_questions = this.copyQuestions(questions);
    new_questions.forEach(question => {
      question.disabled = true;
      question.required = false;

      if (question.isRow) {
        question.rows.forEach(row => {
          row.disabled = true;
          row.required = false;
        });
      }
    });

    let action = this.generateAction(new_questions, subject, 'warn', 'APP.DELETE', 'DIALOG.DELETE');
    
    return {subject, action};
  }

  buildBlankAction(): {subject: Observable<any>, action: (data?: any) => any} {
    let subject = new Subject<any>();
    let action = (data) => {
      subject.next(data);
    };

    return {subject, action};
  }

  private generateAction(questions: DynamicFormQuestion[], subject: Subject<any>, color: string, name: string, title: string): (data?: any) => any {
    return (data?: any) => {
      if (data) {

        questions.forEach(question => {
          if(data.hasOwnProperty(question.key)) {
            question.value = data[question.key];
          }

          if(question.isRow) {
            question.rows.forEach(row => {
              if(data.hasOwnProperty(row.key)) {
                row.value = data[row.key];
              }
            });
          }
        });
      }

      let dialogRef = this.dialog.open(CreateEditDeleteDialogComponent, {
        minWidth: '500px',
        data: { actionColor: color, actionName: name, title: title, questions: questions, element: data}
      });
      dialogRef.afterClosed().subscribe((data) => subject.next(data));
    };
  }

  copyQuestions(questions: DynamicFormQuestion[]): DynamicFormQuestion[] {
      let array = [];

      questions.forEach(question => {
        let obs = question.options_observable;
        question.options_observable = null;
        let new_question:DynamicFormQuestion = JSON.parse(JSON.stringify(question));
        question.options_observable = obs;
        new_question.options_observable = obs;

        array.push(new_question);
      });

      return array;
    }
  }
