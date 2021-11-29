import { Component, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.LOANS';
  }


}
