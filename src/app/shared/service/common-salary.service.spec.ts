import { TestBed } from '@angular/core/testing';

import { CommonSalaryService } from './common-salary.service';

describe('CommonSalaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonSalaryService = TestBed.get(CommonSalaryService);
    expect(service).toBeTruthy();
  });
});
