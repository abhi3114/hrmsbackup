import { TestBed } from '@angular/core/testing';

import { MissingSalaryService } from './missing-salary.service';

describe('MissingSalaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissingSalaryService = TestBed.get(MissingSalaryService);
    expect(service).toBeTruthy();
  });
});
