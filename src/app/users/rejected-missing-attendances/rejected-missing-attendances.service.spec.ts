import { TestBed } from '@angular/core/testing';

import { RejectedMissingAttendancesService } from './rejected-missing-attendances.service';

describe('RejectedMissingAttendancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RejectedMissingAttendancesService = TestBed.get(RejectedMissingAttendancesService);
    expect(service).toBeTruthy();
  });
});
