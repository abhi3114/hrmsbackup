import { TestBed } from '@angular/core/testing';

import { BoosterSessionService } from './booster-session.service';

describe('BoosterSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoosterSessionService = TestBed.get(BoosterSessionService);
    expect(service).toBeTruthy();
  });
});
