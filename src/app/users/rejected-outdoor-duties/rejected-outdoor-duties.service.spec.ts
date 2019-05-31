import { TestBed } from '@angular/core/testing';

import { RejectedOutdoorDutiesService } from './rejected-outdoor-duties.service';

describe('RejectedOutdoorDutiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RejectedOutdoorDutiesService = TestBed.get(RejectedOutdoorDutiesService);
    expect(service).toBeTruthy();
  });
});
