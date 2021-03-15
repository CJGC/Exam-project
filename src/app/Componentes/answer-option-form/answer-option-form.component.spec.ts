import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOptionFormComponent } from './answer-option-form.component';

describe('AnswerOptionFormComponent', () => {
  let component: AnswerOptionFormComponent;
  let fixture: ComponentFixture<AnswerOptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerOptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
