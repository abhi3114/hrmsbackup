import { TestBed } from '@angular/core/testing';

import { CustomPdfService } from './custom-pdf.service';

describe('CustomPdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomPdfService = TestBed.get(CustomPdfService);
    expect(service).toBeTruthy();
  });
});
