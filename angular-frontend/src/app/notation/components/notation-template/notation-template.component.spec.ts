import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationTemplateComponent } from './notation-template.component';

describe('BaseNotationComponent', () => {
  let component: NotationTemplateComponent;
  let fixture: ComponentFixture<NotationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
