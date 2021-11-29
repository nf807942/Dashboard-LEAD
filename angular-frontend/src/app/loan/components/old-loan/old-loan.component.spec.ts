import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldLoanComponent } from './old-loan.component';

describe('OldLoanComponent', () => {
  let component: OldLoanComponent;
  let fixture: ComponentFixture<OldLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
