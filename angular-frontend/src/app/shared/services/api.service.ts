import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(module: string, endpoint: string): Observable<any> {
    return this.http.get(environment.url + 'api/' + module + '/' + endpoint);
  }
}
