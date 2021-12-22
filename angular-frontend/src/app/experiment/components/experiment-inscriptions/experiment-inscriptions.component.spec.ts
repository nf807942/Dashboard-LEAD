import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentInscriptionsComponent } from './experiment-inscriptions.component';

describe('ExperimentInscriptionsComponent', () => {
  let component: ExperimentInscriptionsComponent;
  let fixture: ComponentFixture<ExperimentInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentInscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
