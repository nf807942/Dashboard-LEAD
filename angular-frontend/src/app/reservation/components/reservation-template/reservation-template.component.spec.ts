import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTemplateComponent } from './reservation-template.component';

describe('ReservationTemplateComponent', () => {
  let component: ReservationTemplateComponent;
  let fixture: ComponentFixture<ReservationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
