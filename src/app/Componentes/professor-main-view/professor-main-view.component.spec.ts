import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorMainViewComponent } from './professor-main-view.component';

describe('ProfessorMainViewComponent', () => {
  let component: ProfessorMainViewComponent;
  let fixture: ComponentFixture<ProfessorMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
