import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';

@Component({
  selector: 'app-experiment-template',
  templateUrl: './experiment-template.component.html',
  styleUrls: ['./experiment-template.component.scss']
})
export class ExperimentTemplateComponent implements OnInit, OnDestroy {

  constructor(
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.links = [
      {text: 'SIDENAV.EXPERIMENT.MY-EXPERIMENTS', route:'experiment/my-experiments'},
      {text: 'SIDENAV.EXPERIMENT.OLD-EXPERIMENTS', route:'experiment/old-experiments'},
      {text: 'SIDENAV.EXPERIMENT.EXPERIMENTS', route:'experiment/experiments'}
    ];
  }

  ngOnDestroy(): void {
    this.crossComponentService.links = [];
  }
}
