import { TestBed } from '@angular/core/testing';

import { ApprovedMissingAttendanceService } from './approved-missing-attendance.service';

describe('ApprovedMissingAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovedMissingAttendanceService = TestBed.get(ApprovedMissingAttendanceService);
    expect(service).toBeTruthy();
  });
});
