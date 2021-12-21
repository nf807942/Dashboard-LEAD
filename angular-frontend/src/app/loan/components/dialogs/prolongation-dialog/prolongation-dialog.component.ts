import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from 'src/app/loan/models/loan';

@Component({
  selector: 'app-prolongation-dialog',
  templateUrl: './prolongation-dialog.component.html',
  styleUrls: ['./prolongation-dialog.component.scss']
})
export class ProlongationDialogComponent implements OnInit {

  endDate: FormControl;

  constructor(
    public dialogRef: MatDialogRef<ProlongationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.endDate = new FormControl({}, {validators: [Validators.required]});
  }

  ngOnInit(): void {
  }

  close(): void {
    let element: Loan = this.data;
    element.end_date = this.endDate.value;
    this.dialogRef.close(element);
  }

}
