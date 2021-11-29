import { NgModule } from '@angular/core';
import { BaseNotationComponent } from './components/base-notation/base-notation.component';
import { AddPointsComponent } from './components/add-points/add-points.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BaseNotationComponent,
    
    AddPointsComponent,
    AddStudentComponent
  ],
  imports: [
    SharedModule
  ]
})
export class NotationModule { }
