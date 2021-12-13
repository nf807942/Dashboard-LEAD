import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() clickMenu = new EventEmitter();

  currentLanguage: string;

  constructor(
    private translate: TranslateService,
    public connectionService: ConnectionService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = language;
  }

}
