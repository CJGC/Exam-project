import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudenSelectedResponseComponent } from './exam-studen-selected-response.component';

describe('ExamStudenSelectedResponseComponent', () => {
  let component: ExamStudenSelectedResponseComponent;
  let fixture: ComponentFixture<ExamStudenSelectedResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamStudenSelectedResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudenSelectedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
