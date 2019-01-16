import { TestBed } from '@angular/core/testing';

import { EditSalaryService } from './edit-salary.service';

describe('EditSalaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditSalaryService = TestBed.get(EditSalaryService);
    expect(service).toBeTruthy();
  });
});
