import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mobileFullHeight: string;

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
    moment.locale('fr');

    // mobile full-height
    this.mobileFullHeight = 'calc('+window.innerHeight +'px)';

    window.addEventListener('resize', () => {
      this.mobileFullHeight = 'calc('+window.innerHeight +'px)';
    });
  }

  ngOnInit(): void {
  }

}
