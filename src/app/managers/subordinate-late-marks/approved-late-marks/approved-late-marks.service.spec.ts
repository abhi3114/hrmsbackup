import { TestBed } from '@angular/core/testing';

import { ApprovedLateMarksService } from './approved-late-marks.service';

describe('ApprovedLateMarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovedLateMarksService = TestBed.get(ApprovedLateMarksService);
    expect(service).toBeTruthy();
  });
});
