import { NgModule } from '@angular/core';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ReservationTemplateComponent } from './components/reservation-template/reservation-template.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BuildingsComponent,
    RoomsComponent,
    ReserveComponent,
    MyReservationsComponent,
    ReservationTemplateComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ReservationModule { }
