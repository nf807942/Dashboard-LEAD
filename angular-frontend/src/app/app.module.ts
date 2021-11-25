import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { SharedModule } from './shared/shared.module';
import { NotationModule } from './notation/student.module';
import { LoanModule } from './loan/loan.module';
import { ReservationModule } from './reservation/reservation.module';
import { ExperimentModule } from './experiment/experiment.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Custom Modules
    SharedModule,
    NotationModule,
    LoanModule,
    ExperimentModule,
    ReservationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
