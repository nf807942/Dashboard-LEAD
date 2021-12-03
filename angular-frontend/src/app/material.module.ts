import { NgModule } from '@angular/core';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule
  ],
  exports:[
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSortModule,
  ]
})
export class MaterialModule { }
