import { TestBed } from '@angular/core/testing';

import { RejectedLateMarksService } from './rejected-late-marks.service';

describe('RejectedLateMarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RejectedLateMarksService = TestBed.get(RejectedLateMarksService);
    expect(service).toBeTruthy();
  });
});
