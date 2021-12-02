import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentTemplateComponent } from './experiment/components/experiment-template/experiment-template.component';
import { ExperimentsComponent } from './experiment/components/experiments/experiments.component';
import { MyExperimentsComponent } from './experiment/components/my-experiments/my-experiments.component';
import { OldExperimentsComponent } from './experiment/components/old-experiments/old-experiments.component';
import { AddLoanComponent } from './loan/components/add-loan/add-loan.component';
import { LoanRequestsComponent } from './loan/components/loan-requests/loan-requests.component';
import { LoanTemplateComponent } from './loan/components/loan-template/loan-template.component';
import { LoansComponent } from './loan/components/loans/loans.component';
import { MyLoanComponent } from './loan/components/my-loan/my-loan.component';
import { OldLoanComponent } from './loan/components/old-loan/old-loan.component';
import { ResourcesComponent } from './loan/components/resources/resources.component';
import { TypesComponent } from './loan/components/types/types.component';
import { AddPointsComponent } from './notation/components/add-points/add-points.component';
import { NotationTemplateComponent } from './notation/components/notation-template/notation-template.component';
import { StudentsComponent } from './notation/components/students/students.component';
import { BuildingsComponent } from './reservation/components/buildings/buildings.component';
import { MyReservationsComponent } from './reservation/components/my-reservations/my-reservations.component';
import { ReservationTemplateComponent } from './reservation/components/reservation-template/reservation-template.component';
import { ReserveComponent } from './reservation/components/reserve/reserve.component';
import { RoomsComponent } from './reservation/components/rooms/rooms.component';
import { ModulesComponent } from './shared/components/modules/modules.component';

const routes: Routes = [
  { path: 'login', component: ModulesComponent },
  { path: '', component: ModulesComponent },
  { path: 'notation', component: NotationTemplateComponent,
    children: [
      { path: 'add-points', component: AddPointsComponent },
      { path: 'students', component: StudentsComponent },
    ]
  },
  { path: 'loan', component: LoanTemplateComponent,
  children: [
      { path: '', redirectTo: 'add-loan', pathMatch: 'full' },
      { path: 'add-loan', component: AddLoanComponent },
      { path: 'my-loan', component: MyLoanComponent },
      { path: 'old-loan', component: OldLoanComponent },
      { path: 'types', component: TypesComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'loan-requests', component: LoanRequestsComponent },
      { path: 'loans', component: LoansComponent },
    ]
  },
  { path: 'experiment', component: ExperimentTemplateComponent,
  children: [
      { path: 'my-experiments', component: MyExperimentsComponent },
      { path: 'old-experiments', component: OldExperimentsComponent },
      { path: 'experiments', component: ExperimentsComponent },
  ]},
  { path: 'reservation', component: ReservationTemplateComponent,
  children: [
      { path: 'buildings', component: BuildingsComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'reserve', component: ReserveComponent },
      { path: 'my-reservations', component: MyReservationsComponent },
    ]
  },
  { path: 'logout', component: ModulesComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
