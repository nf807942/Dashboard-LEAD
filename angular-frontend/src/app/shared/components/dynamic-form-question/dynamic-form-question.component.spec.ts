import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestion, DynamicFormQuestionComponent } from './dynamic-form-question.component';

describe('DynamicFormQuestionComponent', () => {
  let component: DynamicFormQuestionComponent;
  let fixture: ComponentFixture<DynamicFormQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('QuestionBase', () => {
  it('should create an instance', () => {
    expect(new DynamicFormQuestion()).toBeTruthy();
  });
});
