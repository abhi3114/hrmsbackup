import { TestBed } from '@angular/core/testing';

import { UnapprovedLateMarksService } from './unapproved-late-marks.service';

describe('UnapprovedLateMarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnapprovedLateMarksService = TestBed.get(UnapprovedLateMarksService);
    expect(service).toBeTruthy();
  });
});
