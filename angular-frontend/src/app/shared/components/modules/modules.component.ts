import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  modulesList = [
    {text: 'MODULES.NOTATION', route: 'notation'},
    {text: 'MODULES.LOAN', route: 'loan'},
    {text: 'MODULES.EXPERIMENT', route: 'experiment'},
    {text: 'MODULES.RESERVATION', route: 'reservation'},
  ];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
