import { TestBed } from '@angular/core/testing';

import { Measurements } from './measurements';

describe('Measurements', () => {
  let service: Measurements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Measurements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
