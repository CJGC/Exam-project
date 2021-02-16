import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMainViewComponent } from './exam-main-view.component';

describe('ExamMainViewComponent', () => {
  let component: ExamMainViewComponent;
  let fixture: ComponentFixture<ExamMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
