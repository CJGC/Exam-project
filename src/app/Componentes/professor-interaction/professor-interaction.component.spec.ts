import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInteractionComponent } from './professor-interaction.component';

describe('ProfessorInteractionComponent', () => {
  let component: ProfessorInteractionComponent;
  let fixture: ComponentFixture<ProfessorInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
