import { TestBed } from '@angular/core/testing';

import { SensorsService } from './sensors.service';

describe('Sensors', () => {
  let service: SensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
