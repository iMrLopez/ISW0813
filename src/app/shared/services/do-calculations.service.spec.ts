import { TestBed } from '@angular/core/testing';

import { DoCalculationsService } from './do-calculations.service';

describe('DoCalculationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoCalculationsService = TestBed.get(DoCalculationsService);
    expect(service).toBeTruthy();
  });
});
