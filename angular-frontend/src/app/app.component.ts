import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';

  sidenavLinks = [
    {icon: 'home', text: 'glu', route:''},
    {icon: 'home', text: 'tatum', route:'test'}
  ];

  constructor(
    private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
    moment.locale('fr');
  }

  ngOnInit(): void {
  }

}
