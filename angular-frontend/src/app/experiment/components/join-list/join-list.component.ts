import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Experiment } from '../../models/experiment';
import { ExperimentService } from '../../services/experiment.service';

@Component({
  selector: 'app-join-list',
  templateUrl: './join-list.component.html',
  styleUrls: ['./join-list.component.scss']
})
export class JoinListComponent implements OnInit {

  experiments$: Observable<Experiment[]>;

  constructor(
    private crossComponentService: CrossComponentService,
    private experimentService: ExperimentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.EXPERIMENT.JOIN';
    
    this.experiments$ = this.experimentService.getRunningExperiments();
  }

}
