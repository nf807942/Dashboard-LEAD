import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldExperimentsComponent } from './old-experiments.component';

describe('OldExperimentsComponent', () => {
  let component: OldExperimentsComponent;
  let fixture: ComponentFixture<OldExperimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldExperimentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
