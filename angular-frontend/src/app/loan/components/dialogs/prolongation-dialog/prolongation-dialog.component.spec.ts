import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProlongationDialogComponent } from './prolongation-dialog.component';

describe('ProlongationDialogComponent', () => {
  let component: ProlongationDialogComponent;
  let fixture: ComponentFixture<ProlongationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProlongationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProlongationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
