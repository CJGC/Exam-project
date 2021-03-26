import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentExamComponent } from './present-exam.component';

describe('PresentExamComponent', () => {
  let component: PresentExamComponent;
  let fixture: ComponentFixture<PresentExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
