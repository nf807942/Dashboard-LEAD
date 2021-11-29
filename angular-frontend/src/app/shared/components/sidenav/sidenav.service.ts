import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public linksChanged: BehaviorSubject<any[]> = new BehaviorSubject([]); 

  constructor() { }

  public get links() : any[] {
    return this.linksChanged.getValue();
  }

  public set links(v : any[]) {
    this.linksChanged.next(v);
  }
  
}
