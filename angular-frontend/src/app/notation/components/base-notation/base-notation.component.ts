import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/components/sidenav/sidenav.service';

@Component({
  selector: 'app-base-notation',
  templateUrl: './base-notation.component.html',
  styleUrls: ['./base-notation.component.scss']
})
export class BaseNotationComponent implements OnInit, OnDestroy {

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit(): void {
    this.sidenavService.links = [
      {text: 'SIDENAV.NOTATION.ADD-POINTS', route:'notation/add-points'},
      {text: 'SIDENAV.NOTATION.ADD-STUDENT', route:'notation/add-student'}
    ];
  }

  ngOnDestroy(): void {
    this.sidenavService.links = [];
  }

}
