import { Component, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.scss']
})
export class LoanRequestsComponent implements OnInit {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.LOAN-REQUESTS';
  }


}
