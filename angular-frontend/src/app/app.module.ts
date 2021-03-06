import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Custom modules
import { SharedModule } from './shared/shared.module';
import { NotationModule } from './notation/notation.module';
import { LoanModule } from './loan/loan.module';
import { ReservationModule } from './reservation/reservation.module';
import { ExperimentModule } from './experiment/experiment.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './shared/components/table/custom-mat-pagniator-intl';
import { LoggedInterceptor } from './shared/interceptors/logged.interceptor';
import { AdminModule } from './admin/admin.module';
import { MAT_DATE_LOCALE, DateAdapter, NativeDateAdapter } from '@angular/material/core';

// loader factory for ngx-translate
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

// start week on monday
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
     return 1;
   }
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
    AdminModule,

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
  providers:  [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoggedInterceptor,
        multi: true
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'fr-FR'
    },
    {provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
