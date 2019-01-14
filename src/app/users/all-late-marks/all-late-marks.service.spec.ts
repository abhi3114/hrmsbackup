import { TestBed } from '@angular/core/testing';

import { AllLateMarksService } from './all-late-marks.service';

describe('AllLateMarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllLateMarksService = TestBed.get(AllLateMarksService);
    expect(service).toBeTruthy();
  });
});
