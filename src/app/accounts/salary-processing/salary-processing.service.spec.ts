import { TestBed } from '@angular/core/testing';

import { SalaryProcessingService } from './salary-processing.service';

describe('SalaryProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryProcessingService = TestBed.get(SalaryProcessingService);
    expect(service).toBeTruthy();
  });
});
