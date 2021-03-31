import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGradeMainViewComponent } from './exam-grade-main-view.component';

describe('ExamGradeMainViewComponent', () => {
  let component: ExamGradeMainViewComponent;
  let fixture: ComponentFixture<ExamGradeMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamGradeMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamGradeMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
