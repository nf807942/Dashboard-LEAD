import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ModulesComponent } from './components/modules/modules.component';
import { TableComponent } from './components/table/table.component';
import { ModuleContainerComponent } from './components/module-container/module-container.component';
import { MessageSnackbarComponent } from './components/message-snackbar/message-snackbar.component';
import { DetailsDialogComponent } from './components/dialogs/details-dialog/details-dialog.component';
import { CreateEditDeleteDialogComponent } from './components/dialogs/create-edit-delete-dialog/create-edit-delete-dialog.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    ModulesComponent,
    TableComponent,
    ModuleContainerComponent,
    MessageSnackbarComponent,
    DetailsDialogComponent,
    CreateEditDeleteDialogComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    TableComponent,
    ModuleContainerComponent,
    MessageSnackbarComponent,
    DynamicFormComponent,

    FormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
