import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DetailsDialogComponent } from '../dialogs/details-dialog/details-dialog.component';

@Component({
  selector: 'app-message-snackbar',
  templateUrl: './message-snackbar.component.html',
  styleUrls: ['./message-snackbar.component.scss']
})
export class MessageSnackbarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  openDetails(): void {
    this.dialog.open(DetailsDialogComponent, {
      minWidth: '200px',
      minHeight: '200px',
      data: {
        details: this.data.details
      }
    });
  }

}
