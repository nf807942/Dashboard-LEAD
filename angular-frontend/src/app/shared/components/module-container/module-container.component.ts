import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CrossComponentService } from '../../services/cross-component.service';

@Component({
  selector: 'app-module-container',
  templateUrl: './module-container.component.html',
  styleUrls: ['./module-container.component.scss']
})
export class ModuleContainerComponent implements OnInit {

  title: string = '';

  constructor(
    private crossComponentService: CrossComponentService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.crossComponentService.titleChanged.subscribe((title) => {
      this.title = title;
      this.changeDetector.detectChanges();
    });
  }

}


