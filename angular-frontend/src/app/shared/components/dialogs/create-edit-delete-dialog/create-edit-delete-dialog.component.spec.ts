import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDeleteDialogComponent } from './create-edit-delete-dialog.component';

describe('CreateEditDeleteDialogComponent', () => {
  let component: CreateEditDeleteDialogComponent;
  let fixture: ComponentFixture<CreateEditDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
