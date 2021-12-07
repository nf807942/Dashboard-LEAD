import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class ConnectionService {

  get connected(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  set connected(b: boolean) {
    localStorage.setItem('authenticated', b ? 'true' : 'false');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    if(localStorage.getItem('authenticated') === null) {
      this.connected = true;
    }
  }

  logout(): void {
    this.http.get(environment.url+'api/logout', {withCredentials: true}).pipe(catchError(() => of())).subscribe(() => {
       this.redirectLogout();
    });
  }

  login(data: any): Observable<boolean> {
    return this.http.get(environment.url+'sanctum/csrf-cookie', {withCredentials: true}).pipe(
      mergeMap(() => this.http.post(environment.url+'api/login', data, {withCredentials: true})),
      map(data => data as boolean),
      catchError((error: HttpErrorResponse) =>  of(error.status !== 422))
    );
  }

  redirectLogout(): void {
    this.connected = false;
    this.router.navigate(['/login']);
  }

  redirectLogin(): void {
    this.connected = true;
    this.router.navigate(['/']);
  }
}
