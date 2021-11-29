import { NgModule } from '@angular/core';
import { NotationTemplateComponent } from './components/notation-template/notation-template.component';
import { AddPointsComponent } from './components/add-points/add-points.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { SharedModule } from '../shared/shared.module';
import { StudentsComponent } from './components/students/students.component';



@NgModule({
  declarations: [
    NotationTemplateComponent,
    
    AddPointsComponent,
    AddStudentComponent,
    StudentsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class NotationModule { }
