import { Component, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent implements OnInit {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.links = [
      {text: 'SIDENAV.ADMIN.USERS', route:'admin/users'},
    ];
    this.crossComponentService.toolbarTitle = 'MODULES.ADMIN';
  }

  ngOnDestroy(): void {
    this.crossComponentService.quitModule();
  }

}
