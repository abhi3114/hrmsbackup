import { TestBed } from '@angular/core/testing';

import { UnapprovedOutdoorDutiesService } from './unapproved-outdoor-duties.service';

describe('UnapprovedOutdoorDutiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnapprovedOutdoorDutiesService = TestBed.get(UnapprovedOutdoorDutiesService);
    expect(service).toBeTruthy();
  });
});
