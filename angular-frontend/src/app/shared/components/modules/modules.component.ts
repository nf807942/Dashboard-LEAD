import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  environement = environment;

  modulesList = [
    {text: 'MODULES.NOTATION', route: 'notation', image: 'school_white_24dp.svg'},
    {text: 'MODULES.LOAN', route: 'loan', image: 'shopping_basket_white_24dp.svg'},
    {text: 'MODULES.EXPERIMENT', route: 'experiment', image: 'science_white_24dp.svg'},
    {text: 'MODULES.RESERVATION', route: 'reservation', image: 'meeting_room_white_24dp.svg'},
    {text: 'MODULES.INTERNSHIP', route: '', image: 'work_white_24dp.svg'},
  ];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
