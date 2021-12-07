import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../../services/connection.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loading: boolean = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private connectionService: ConnectionService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', {validators: Validators.required}),
      password: this.fb.control('', {validators: Validators.required})
    });
  }

  login(): void {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      this.connectionService.login(this.form.value).subscribe(data => {
        this.loading = false;
        if (data) {
          this.connectionService.redirectLogin();
        } else {
          this.snackbarService.error(4, 'APP.PASSWORD-ERROR');
        }
      });
    }
  }

}
