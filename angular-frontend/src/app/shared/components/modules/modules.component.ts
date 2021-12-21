import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  environement = environment;
  modulesList = MODULE_LINKS;

  constructor(
    public connectionService: ConnectionService
  ) {
  }

  ngOnInit(): void {
  }

}

export const MODULE_LINKS = [
  {text: 'MODULES.NOTATION', route: 'notation', image: 'school_white_24dp.svg', connected: true},
  {text: 'MODULES.LOAN', route: 'loan', image: 'shopping_basket_white_24dp.svg', connected: true},
  {text: 'MODULES.EXPERIMENT', route: 'experiment', image: 'science_white_24dp.svg'},
  {text: 'MODULES.RESERVATION', route: 'reservation', image: 'meeting_room_white_24dp.svg', connected: true},
  {text: 'MODULES.INTERNSHIP', route: 'internship', image: 'work_white_24dp.svg', connected: true},
];
