import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNotationComponent } from './base-notation.component';

describe('BaseNotationComponent', () => {
  let component: BaseNotationComponent;
  let fixture: ComponentFixture<BaseNotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseNotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
