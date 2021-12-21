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
      {text: 'SIDENAV.EXPERIMENT.JOIN', route:'experiment/join'},
      {gap:true, connected: true},
      {text: 'SIDENAV.EXPERIMENT.CREATE-EXPERIMENT', route:'experiment/create-experiment', connected: true},
      {text: 'SIDENAV.EXPERIMENT.EXPERIMENTS', route:'experiment/experiments', connected: true}
    ];
    this.crossComponentService.toolbarTitle = 'MODULES.EXPERIMENT';
  }

  ngOnDestroy(): void {
    this.crossComponentService.quitModule();
  }
}
