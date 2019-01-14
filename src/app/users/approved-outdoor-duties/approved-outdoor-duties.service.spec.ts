import { TestBed } from '@angular/core/testing';

import { ApprovedOutdoorDutiesService } from './approved-outdoor-duties.service';

describe('ApprovedOutdoorDutiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovedOutdoorDutiesService = TestBed.get(ApprovedOutdoorDutiesService);
    expect(service).toBeTruthy();
  });
});
