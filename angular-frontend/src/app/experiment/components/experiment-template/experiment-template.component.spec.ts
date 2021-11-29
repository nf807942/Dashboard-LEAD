import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentTemplateComponent } from './experiment-template.component';

describe('ExperimentTemplateComponent', () => {
  let component: ExperimentTemplateComponent;
  let fixture: ComponentFixture<ExperimentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
