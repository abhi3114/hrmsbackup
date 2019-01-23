import { TestBed } from '@angular/core/testing';

import { FullAndFinalService } from './full-and-final.service';

describe('FullAndFinalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullAndFinalService = TestBed.get(FullAndFinalService);
    expect(service).toBeTruthy();
  });
});
