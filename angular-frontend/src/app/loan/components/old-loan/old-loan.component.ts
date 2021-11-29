import { Component, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-old-loan',
  templateUrl: './old-loan.component.html',
  styleUrls: ['./old-loan.component.scss']
})
export class OldLoanComponent implements OnInit {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.OLD-LOAN';
  }


}
