import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  errorCatching = catchError((error: HttpErrorResponse) => {
    this.snackbarService.error(5, 'SNACKBAR.ERROR-SERVER', error.message);
    return of(null)
  })

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }

  private url(module: string, endpoint: string): string {
    return environment.url + 'api/' + module + '/' + endpoint;
  }

  get(module: string, endpoint: string): Observable<any> {
    return this.http.get(this.url(module, endpoint)).pipe(this.errorCatching);
  }

  post(module: string, endpoint: string, data: any): Observable<any> {
    return this.http.post(this.url(module, endpoint), data).pipe(this.errorCatching);
  }

  put(module: string, endpoint: string, data: any): Observable<any> {
    return this.http.put(this.url(module, endpoint), data).pipe(this.errorCatching);
  }

  delete(module: string, endpoint: string): Observable<any> {
    return this.http.delete(this.url(module, endpoint)).pipe(this.errorCatching);
  }

  patch(module: string, endpoint: string, data: any): Observable<any> {
    return this.http.patch(this.url(module, endpoint), data).pipe(this.errorCatching);
  }
}
