import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudenOpenResponseComponent } from './exam-studen-open-response.component';

describe('ExamStudenOpenResponseComponent', () => {
  let component: ExamStudenOpenResponseComponent;
  let fixture: ComponentFixture<ExamStudenOpenResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamStudenOpenResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudenOpenResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
