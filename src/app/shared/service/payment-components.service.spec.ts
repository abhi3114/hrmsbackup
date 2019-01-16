import { TestBed } from '@angular/core/testing';

import { PaymentComponentsService } from './payment-components.service';

describe('PaymentComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentComponentsService = TestBed.get(PaymentComponentsService);
    expect(service).toBeTruthy();
  });
});
