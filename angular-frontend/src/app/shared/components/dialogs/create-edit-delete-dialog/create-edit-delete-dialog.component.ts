import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormQuestion } from '../../dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'app-create-edit-delete-dialog',
  templateUrl: './create-edit-delete-dialog.component.html',
  styleUrls: ['./create-edit-delete-dialog.component.scss']
})
export class CreateEditDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateEditDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  ngOnInit(): void {
  }

}
