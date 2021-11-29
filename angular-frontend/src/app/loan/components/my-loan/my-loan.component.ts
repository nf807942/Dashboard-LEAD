import { Component, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-my-loan',
  templateUrl: './my-loan.component.html',
  styleUrls: ['./my-loan.component.scss']
})
export class MyLoanComponent implements OnInit {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.MY-LOAN';
  }


}
