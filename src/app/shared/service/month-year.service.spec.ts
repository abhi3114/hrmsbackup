import { TestBed } from '@angular/core/testing';

import { MonthYearService } from './month-year.service';

describe('MonthYearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthYearService = TestBed.get(MonthYearService);
    expect(service).toBeTruthy();
  });
});
