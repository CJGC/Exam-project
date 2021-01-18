import { TestBed } from '@angular/core/testing';

import { CreateProfessorService } from './create-professor.service';

describe('CreateProfessorService', () => {
  let service: CreateProfessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateProfessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
