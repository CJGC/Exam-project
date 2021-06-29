import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryStudentGradeComponent } from './query-student-grade.component';

describe('QueryStudentGrandeComponent', () => {
  let component: QueryStudentGradeComponent;
  let fixture: ComponentFixture<QueryStudentGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryStudentGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryStudentGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
