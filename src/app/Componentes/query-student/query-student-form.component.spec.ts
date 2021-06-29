import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryStudentFormComponent } from './query-student-form.component';

describe('StudentFormComponent', () => {
  let component: QueryStudentFormComponent;
  let fixture: ComponentFixture<QueryStudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryStudentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
