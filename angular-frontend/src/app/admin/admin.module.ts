import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';



@NgModule({
  declarations: [
    UsersComponent,
    AdminTemplateComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
