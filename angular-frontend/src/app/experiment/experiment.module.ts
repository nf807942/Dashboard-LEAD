import { NgModule } from '@angular/core';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { ExperimentTemplateComponent } from './components/experiment-template/experiment-template.component';
import { SharedModule } from '../shared/shared.module';
import { JoinComponent } from './components/join/join.component';
import { CreateExperimentComponent } from './components/create-experiment/create-experiment.component';
import { JoinListComponent } from './components/join-list/join-list.component';


@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentTemplateComponent,
    JoinComponent,
    CreateExperimentComponent,
    JoinListComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class ExperimentModule { }
