import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrossComponentService {

  public linksChanged: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public titleChanged: BehaviorSubject<string> = new BehaviorSubject('');
  public badgesChanged: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  public get links() : any[] {
    return this.linksChanged.getValue();
  }

  public set links(v : any[]) {
    this.linksChanged.next(v);
  }

  public get title() : string {
    return this.titleChanged.getValue();
  }

  public set title(v : string) {
    this.titleChanged.next(v);
  }

  public get badges() : any[] {
    return this.badgesChanged.getValue();
  }

  public set badges(v : any[]) {
    this.badgesChanged.next(v);
  }
}
