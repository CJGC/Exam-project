import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailsViewComponent } from './exam-details-view.component';

describe('ExamDetailsViewComponent', () => {
  let component: ExamDetailsViewComponent;
  let fixture: ComponentFixture<ExamDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
