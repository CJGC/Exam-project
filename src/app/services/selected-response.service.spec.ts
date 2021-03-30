import { TestBed } from '@angular/core/testing';

import { SelectedResponseService } from './selected-response.service';

describe('SelectedResponseService', () => {
  let service: SelectedResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
