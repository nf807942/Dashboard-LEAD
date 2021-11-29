import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPointsComponent } from './notation/components/add-points/add-points.component';
import { AddStudentComponent } from './notation/components/add-student/add-student.component';
import { BaseNotationComponent } from './notation/components/base-notation/base-notation.component';
import { ModulesComponent } from './shared/components/modules/modules.component';

const routes: Routes = [
  { path: 'login', component: ModulesComponent },
  { path: '', component: ModulesComponent },
  { path: 'notation', component: BaseNotationComponent,
    children: [
      {
        path: 'add-points',
        component: AddPointsComponent,
      },
      {
        path: 'add-student',
        component: AddStudentComponent,
      },
    ]
  },
  { path: 'logout', component: ModulesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
