import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin/components/admin-template/admin-template.component';
import { UsersComponent } from './admin/components/users/users.component';
import { CreateExperimentComponent } from './experiment/components/create-experiment/create-experiment.component';
import { ExperimentInscriptionsComponent } from './experiment/components/experiment-inscriptions/experiment-inscriptions.component';
import { ExperimentTemplateComponent } from './experiment/components/experiment-template/experiment-template.component';
import { ExperimentsComponent } from './experiment/components/experiments/experiments.component';
import { JoinListComponent } from './experiment/components/join-list/join-list.component';
import { JoinComponent } from './experiment/components/join/join.component';
import { AddLoanComponent } from './loan/components/add-loan/add-loan.component';
import { LoanRequestsComponent } from './loan/components/loan-requests/loan-requests.component';
import { LoanTemplateComponent } from './loan/components/loan-template/loan-template.component';
import { LoansComponent } from './loan/components/loans/loans.component';
import { MyLoanComponent } from './loan/components/my-loan/my-loan.component';
import { MyRequestsComponent } from './loan/components/my-requests/my-requests.component';
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
import { LoginComponent } from './shared/components/login/login.component';
import { ModulesComponent } from './shared/components/modules/modules.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { LoggedGuard } from './shared/guards/logged.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ModulesComponent},

  { path: 'admin', component: AdminTemplateComponent, canActivate: [LoggedGuard, AdminGuard], children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
  ]},
  { path: 'notation', component: NotationTemplateComponent, canActivate: [LoggedGuard], children: [
    { path: '', redirectTo: 'add-points', pathMatch: 'full' },
    { path: 'add-points', component: AddPointsComponent },
    { path: 'students', component: StudentsComponent },
  ]},
  { path: 'loan', component: LoanTemplateComponent, canActivate: [LoggedGuard], children: [
    { path: '', redirectTo: 'add-loan', pathMatch: 'full' },
    { path: 'add-loan', component: AddLoanComponent },
    { path: 'my-loan', component: MyLoanComponent },
    { path: 'my-requests', component: MyRequestsComponent },
    { path: 'types', component: TypesComponent, canActivate: [AdminGuard] },
    { path: 'resources', component: ResourcesComponent, canActivate: [AdminGuard] },
    { path: 'loan-requests', component: LoanRequestsComponent, canActivate: [AdminGuard] },
    { path: 'loans', component: LoansComponent, canActivate: [AdminGuard] },
  ]},
  { path: 'experiment', component: ExperimentTemplateComponent, children: [
    { path: '', redirectTo: 'join', pathMatch: 'full' },
    { path: 'create-experiment', component: CreateExperimentComponent, canActivate: [LoggedGuard] },
    { path: 'experiments', component: ExperimentsComponent, canActivate: [LoggedGuard] },
    { path: 'inscriptions/:id', component: ExperimentInscriptionsComponent, canActivate: [LoggedGuard] },
    { path: 'join', component: JoinListComponent },
    { path: 'join/:id', component: JoinComponent },
  ]},
  { path: 'reservation', component: ReservationTemplateComponent, canActivate: [LoggedGuard], children: [
    { path: '', redirectTo: 'reserve', pathMatch: 'full' },
    { path: 'reserve', component: ReserveComponent },
    { path: 'my-reservations', component: MyReservationsComponent },
    { path: 'buildings', component: BuildingsComponent, canActivate: [AdminGuard] },
    { path: 'rooms', component: RoomsComponent, canActivate: [AdminGuard] },
  ]},

  { path: 'logout', component: ModulesComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
