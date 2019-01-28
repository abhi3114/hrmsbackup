import { TestBed } from '@angular/core/testing';

import { AllMissingAttendanceService } from './all-missing-attendance.service';

describe('AllMissingAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllMissingAttendanceService = TestBed.get(AllMissingAttendanceService);
    expect(service).toBeTruthy();
  });
});
