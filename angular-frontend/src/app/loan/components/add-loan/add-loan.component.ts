import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Resource } from '../../models/resource';
import { Type } from '../../models/type';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false, showError: true},
    },
  ],
})
export class AddLoanComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('types_list') types_list: MatSelectionList;
  @ViewChild('resources_list') resources_list: MatSelectionList;

  endDate: FormControl;

  types$: Observable<Type[]> = null;
  resources$: Observable<Resource[]> = null;
  selected: Resource = null;

  date: Date;

  constructor(
    private loanService: LoanService,
    private crossComponentService: CrossComponentService,
  ) {
    this.types$ = this.loanService.getTypes();

    this.endDate = new FormControl({}, {validators: [Validators.required]});
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.LOAN.ADD-LOAN';
  }

  loadResources() {
    this.resources$ = this.loanService.getResourcesOfType(this.types_list.selectedOptions.selected[0]?.value).pipe(
      map(data => data.filter(resource => resource.loans.length === 0)),
    );
    this.stepper.next();
  }

  makeLoan() {
    this.date = new Date();
    this.selected = this.resources_list.selectedOptions.selected[0]?.value;
    this.stepper.next();
  }

  backToTypes() {
    this.types_list.deselectAll();
    this.stepper.previous();
  }

  backToResources() {
    this.resources_list.deselectAll();
    this.stepper.previous();
  }

  sendRequest() {
    this.loanService.makeLoanRequest({id: this.selected.id, end_date: moment(this.endDate.value).format('YYYY-MM-DD').toString()}).subscribe(() => {
      this.endDate.reset();
      this.backToResources();
      this.backToTypes();
    });
  }

}
