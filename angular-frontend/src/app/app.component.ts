import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
  }

  ngOnInit(): void {
  }

}
