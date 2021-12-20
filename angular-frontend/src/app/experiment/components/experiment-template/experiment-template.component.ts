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
      {text: 'SIDENAV.EXPERIMENT.JOIN', route:'experiment/join', always: true},
      {gap:true},
      {text: 'SIDENAV.EXPERIMENT.CREATE-EXPERIMENT', route:'experiment/create-experiment'},
      {text: 'SIDENAV.EXPERIMENT.MY-EXPERIMENTS', route:'experiment/my-experiments'},
      {gap:true},
      {text: 'SIDENAV.EXPERIMENT.EXPERIMENTS', route:'experiment/experiments', admin: true}
    ];
  }

  ngOnDestroy(): void {
    this.crossComponentService.links = [];
  }
}
