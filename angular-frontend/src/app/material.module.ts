import { NgModule } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule
  ],
  exports:[
    MatGridListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatRippleModule
  ]
})
export class MaterialModule { }
