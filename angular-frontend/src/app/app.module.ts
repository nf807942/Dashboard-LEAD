import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';

// Custom modules
import { SharedModule } from './shared/shared.module';
import { NotationModule } from './notation/notation.module';
import { LoanModule } from './loan/loan.module';
import { ReservationModule } from './reservation/reservation.module';
import { ExperimentModule } from './experiment/experiment.module';

// loader factory for ngx-translate
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, environment.i18n);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    // Custom Modules
    SharedModule,
    NotationModule,
    LoanModule,
    ExperimentModule,
    ReservationModule,

     // ngx-translate and the loader module
     TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: HttpLoaderFactory,
             deps: [HttpClient]
         }
     })
  ],
  exports: [
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
