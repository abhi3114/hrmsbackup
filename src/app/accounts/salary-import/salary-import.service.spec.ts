import { TestBed } from '@angular/core/testing';

import { SalaryImportService } from './salary-import.service';

describe('SalaryImportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryImportService = TestBed.get(SalaryImportService);
    expect(service).toBeTruthy();
  });
});
