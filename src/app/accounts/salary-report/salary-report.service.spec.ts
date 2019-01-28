import { TestBed } from '@angular/core/testing';

import { SalaryReportService } from './salary-report.service';

describe('SalaryReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryReportService = TestBed.get(SalaryReportService);
    expect(service).toBeTruthy();
  });
});
