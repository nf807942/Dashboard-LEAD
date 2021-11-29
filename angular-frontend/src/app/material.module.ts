import { NgModule } from '@angular/core';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
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
    MatFormFieldModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSortModule
  ]
})
export class MaterialModule { }
