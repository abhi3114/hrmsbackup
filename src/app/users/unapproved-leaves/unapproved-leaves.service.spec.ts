import { TestBed } from '@angular/core/testing';

import { UnapprovedLeavesService } from './unapproved-leaves.service';

describe('UnapprovedLeavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnapprovedLeavesService = TestBed.get(UnapprovedLeavesService);
    expect(service).toBeTruthy();
  });
});
