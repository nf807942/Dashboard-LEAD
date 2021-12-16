import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
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

  get user(): User {
    let user = localStorage.getItem('user');
    return this.connected ? user ? new User(JSON.parse(user)) : null : null;
  }

  set user(u: User) {
    localStorage.setItem('user', JSON.stringify(u));
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    if(localStorage.getItem('authenticated') === null) {
      this.connected = false;
    }
  }

  logout(): void {
    this.http.get(environment.url+'api/logout', {withCredentials: true}).pipe(catchError(() => of())).subscribe(() => {
       this.redirectLogout();
    });
  }

  login(data: any): Observable<User> {
    return this.http.get(environment.url+'sanctum/csrf-cookie', {withCredentials: true}).pipe(
      mergeMap(() => this.http.post(environment.url+'api/login', data, {withCredentials: true})),
      catchError(() =>  of(false)),
      mergeMap((success) => {
        if(success) {
          return this.http.get(environment.url+'api/user', {withCredentials: true});
        }
        return of(null)
      }),
      catchError(() =>  of(null)),
      tap((user: User) => {
        if(user) {
          this.user = user;
        }
      })
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

  isAdmin(): boolean {
    let user = this.user;
    if (user) {
      return user.admin;
    }
    return false;
  }
}

export class User {
  id: number;
  name: string;
  email: string;
  role: any;

  constructor(data: Partial<User>){
    Object.assign(this, data);
  }

  get admin(): any {
    return this.role.label == 'ADMIN';
  }
}
