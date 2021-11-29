import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-loan-template',
  templateUrl: './loan-template.component.html',
  styleUrls: ['./loan-template.component.scss']
})
export class LoanTemplateComponent implements OnInit, OnDestroy {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.links = [
      {text: 'SIDENAV.LOAN.ADD-LOAN', route:'loan/add-loan'},
      {text: 'SIDENAV.LOAN.MY-LOAN', route:'loan/my-loan'},
      {text: 'SIDENAV.LOAN.OLD-LOAN', route:'loan/old-loan'},
      {gap:true},
      {text: 'SIDENAV.LOAN.TYPES', route:'loan/types'},
      {text: 'SIDENAV.LOAN.RESOURCES', route:'loan/resources'},
      {text: 'SIDENAV.LOAN.LOAN-REQUESTS', route:'loan/loan-requests'},
      {text: 'SIDENAV.LOAN.LOANS', route:'loan/loans'},
    ];
  }

  ngOnDestroy(): void {
    this.crossComponentService.links = [];
  }

}
