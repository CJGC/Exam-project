import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMainViewComponent } from './question-main-view.component';

describe('QuestionMainViewComponent', () => {
  let component: QuestionMainViewComponent;
  let fixture: ComponentFixture<QuestionMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
