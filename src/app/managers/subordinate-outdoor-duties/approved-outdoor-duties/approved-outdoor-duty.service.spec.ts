import { TestBed } from '@angular/core/testing';

import { ApprovedOutdoorDutyService } from './approved-outdoor-duty.service';

describe('ApprovedOutdoorDutyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovedOutdoorDutyService = TestBed.get(ApprovedOutdoorDutyService);
    expect(service).toBeTruthy();
  });
});
