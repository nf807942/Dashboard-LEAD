import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-notation-template',
  templateUrl: './notation-template.component.html',
  styleUrls: ['./notation-template.component.scss']
})
export class NotationTemplateComponent implements OnInit, OnDestroy {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.links = [
      {text: 'SIDENAV.NOTATION.ADD-POINTS', route:'notation/add-points'},
      {text: 'SIDENAV.NOTATION.STUDENTS', route:'notation/students'}
    ];
  }

  ngOnDestroy(): void {
    this.crossComponentService.links = [];
  }

}
