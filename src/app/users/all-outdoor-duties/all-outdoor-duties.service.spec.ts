import { TestBed } from '@angular/core/testing';

import { AllOutdoorDutiesService } from './all-outdoor-duties.service';

describe('AllOutdoorDutiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllOutdoorDutiesService = TestBed.get(AllOutdoorDutiesService);
    expect(service).toBeTruthy();
  });
});
