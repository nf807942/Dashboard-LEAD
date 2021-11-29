import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  modulesList = [
    {text: 'MODULES.NOTATION', route: 'notation'},
    {text: 'MODULES.LOAN', route: ''},
    {text: 'MODULES.EXPERIMENT', route: ''},
    {text: 'MODULES.RESERVATION', route: ''},
  ];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
