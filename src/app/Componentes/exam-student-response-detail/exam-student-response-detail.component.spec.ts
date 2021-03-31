import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentResponseDetailComponent } from './exam-student-response-detail.component';

describe('ExamStudentResponseDetailComponent', () => {
  let component: ExamStudentResponseDetailComponent;
  let fixture: ComponentFixture<ExamStudentResponseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamStudentResponseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentResponseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
