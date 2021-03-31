import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentsResponsesComponent } from './exam-students-responses.component';

describe('ExamGradeStudentsResponsesComponent', () => {
  let component: ExamStudentsResponsesComponent;
  let fixture: ComponentFixture<ExamStudentsResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamStudentsResponsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentsResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
