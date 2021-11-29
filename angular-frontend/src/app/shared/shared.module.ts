import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ModulesComponent } from './components/modules/modules.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    ModulesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,

    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
  ]
})
export class SharedModule { }
