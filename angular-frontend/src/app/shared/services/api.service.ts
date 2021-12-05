import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TableComponent } from '../components/table/table.component';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  errorCatching = catchError((error: HttpErrorResponse): Observable<any> => {
    this.snackbarService.error(4, 'SNACKBAR.ERROR-SERVER', error.message);
    return throwError(error);
  })

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }

  private url(module: string, endpoint: string, id?: number): string {
    return environment.url + 'api/' + module + '/' + endpoint + (id ? '/' + id : '');
  }

  get(module: string, endpoint: string, options: any = {}): Observable<any> {
    return this.http.get(this.url(module, endpoint), options).pipe(
      this.errorCatching,
      catchError(() => of([]))
    );
  }

  post(module: string, endpoint: string, data: any): Observable<any> {
    return this.http.post(this.url(module, endpoint), data).pipe(this.errorCatching);
  }

  put(module: string, endpoint: string, data: any): Observable<any> {
    return this.http.put(this.url(module, endpoint), data).pipe(
      this.errorCatching,
      tap(() =>  this.snackbarService.success(4, 'SNACKBAR.PUT-SUCCESS')),
      catchError(() => of(null))
    );
  }

  delete(module: string, endpoint: string, id: number): Observable<any> {
    return this.http.delete(this.url(module, endpoint, id)).pipe(
      this.errorCatching,
      tap(() =>  this.snackbarService.success(4, 'SNACKBAR.DELETE-SUCCESS')),
      catchError(() => of(null))
    );
  }

  patch(module: string, endpoint: string, data: any, id: number): Observable<any> {
    return this.http.patch(this.url(module, endpoint, id), data).pipe(
      this.errorCatching,
      tap(() =>  this.snackbarService.success(4, 'SNACKBAR.PATCH-SUCCESS')),
      catchError(() => of(null))
    );
  }

  putTableUpdate(table: TableComponent): (data: any) => any {
    return result => {
      if(result !== null) {
        table.addData([result]);
      }
    }
  }

  patchTableUpdate(table: TableComponent): (data: any) => any {
    return result => {
      if(result !== null) {
        table.patchData(result.old, result.new);
      }
    }
  }

  deleteTableUpdate(table: TableComponent): (data: any) => any {
    return result => {
      if(result !== null) {
        table.removeData([result]);
      }
    }
  }


}
