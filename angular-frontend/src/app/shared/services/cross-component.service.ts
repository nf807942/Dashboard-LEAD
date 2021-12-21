import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MODULE_LINKS } from '../components/modules/modules.component';

@Injectable({
  providedIn: 'root'
})
export class CrossComponentService {

  public linksChanged: BehaviorSubject<any[]> = new BehaviorSubject(MODULE_LINKS);
  public titleChanged: BehaviorSubject<string> = new BehaviorSubject('');
  public toolbarTitleChanged: BehaviorSubject<string> = new BehaviorSubject('APP.DASHBOARD');
  public badgesChanged: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  public get links() : any[] {
    return this.linksChanged.getValue();
  }

  public set links(v : any[]) {
    this.linksChanged.next(v);
  }

  public resetLinks() {
    this.linksChanged.next(MODULE_LINKS);
  }

  public get title() : string {
    return this.titleChanged.getValue();
  }

  public set title(v : string) {
    this.titleChanged.next(v);
  }

  public get toolbarTitle() : string {
    return this.toolbarTitleChanged.getValue();
  }

  public set toolbarTitle(v : string) {
    this.toolbarTitleChanged.next(v);
  }

  public resetToolbarTitle() {
    this.toolbarTitleChanged.next('APP.DASHBOARD');
  }

  public get badges() : any[] {
    return this.badgesChanged.getValue();
  }

  public set badges(v : any[]) {
    this.badgesChanged.next(v);
  }

  public quitModule() {
    this.resetLinks();
    this.resetToolbarTitle();
  }
}
