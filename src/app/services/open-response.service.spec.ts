import { TestBed } from '@angular/core/testing';

import { OpenResponseService } from './open-response.service';

describe('OpenResponseService', () => {
  let service: OpenResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
