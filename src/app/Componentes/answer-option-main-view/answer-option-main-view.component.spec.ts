import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOptionMainViewComponent } from './answer-option-main-view.component';

describe('AnswerOptionMainViewComponent', () => {
  let component: AnswerOptionMainViewComponent;
  let fixture: ComponentFixture<AnswerOptionMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerOptionMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerOptionMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
