import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../components/message-snackbar/message-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(duration: number, icon: string, message: string, color: string, details?: string): void {
    this.snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: duration * 1000,
      panelClass: [color],
      data: {
        icon: icon,
        message: message,
        color: color,
        details: details
      }
    });
  }

  success(duration: number, message: string, details?: string): void {
    this.open(duration, 'check', message, 'success-snackbar',  details);
  }

  error(duration: number, message: string, details?: string): void {
    this.open(duration, 'error_outline', message, 'error-snackbar', details);
  }

  loading(): void {
    this.open(0, null, 'APP.LOADING', null)
  }

  dismiss(): void {
    this.snackBar.dismiss();
  }
}
