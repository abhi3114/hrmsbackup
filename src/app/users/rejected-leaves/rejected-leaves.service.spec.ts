import { TestBed } from '@angular/core/testing';

import { RejectedLeavesService } from './rejected-leaves.service';

describe('RejectedLeavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RejectedLeavesService = TestBed.get(RejectedLeavesService);
    expect(service).toBeTruthy();
  });
});
