import { TestBed } from '@angular/core/testing';

import { ApprovedLeavesService } from './approved-leaves.service';

describe('ApprovedLeavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovedLeavesService = TestBed.get(ApprovedLeavesService);
    expect(service).toBeTruthy();
  });
});
