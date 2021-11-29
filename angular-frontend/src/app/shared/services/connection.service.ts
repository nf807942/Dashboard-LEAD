import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class ConnectionService {

  public connected: boolean = true;

  constructor() { }
}
