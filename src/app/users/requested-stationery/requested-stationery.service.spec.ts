import { TestBed } from '@angular/core/testing';

import { RequestedStationeryService } from './requested-stationery.service';

describe('RequestedStationeryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestedStationeryService = TestBed.get(RequestedStationeryService);
    expect(service).toBeTruthy();
  });
});
