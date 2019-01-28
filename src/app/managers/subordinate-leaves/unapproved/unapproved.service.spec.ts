import { TestBed } from '@angular/core/testing';

import { UnapprovedService } from './unapproved.service';

describe('UnapprovedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnapprovedService = TestBed.get(UnapprovedService);
    expect(service).toBeTruthy();
  });
});
