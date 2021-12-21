import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ConnectionService } from '../../services/connection.service';
import { CrossComponentService } from '../../services/cross-component.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() clickMenu = new EventEmitter();

  title: string;
  currentLanguage: string;

  constructor(
    private translate: TranslateService,
    public connectionService: ConnectionService,
    private crossComponentService: CrossComponentService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;

    this.crossComponentService.toolbarTitleChanged.subscribe(title => {
      this.title = title;
      this.changeDetector.detectChanges();
    });
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = language;
    moment.locale(language);
  }

}
