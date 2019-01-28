import { TestBed } from '@angular/core/testing';

import { UnapprovedMissingAttendanceService } from './unapproved-missing-attendance.service';

describe('UnapprovedMissingAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnapprovedMissingAttendanceService = TestBed.get(UnapprovedMissingAttendanceService);
    expect(service).toBeTruthy();
  });
});
