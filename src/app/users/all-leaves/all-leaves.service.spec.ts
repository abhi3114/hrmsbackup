import { TestBed } from '@angular/core/testing';

import { AllLeavesService } from './all-leaves.service';

describe('AllLeavesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllLeavesService = TestBed.get(AllLeavesService);
    expect(service).toBeTruthy();
  });
});
