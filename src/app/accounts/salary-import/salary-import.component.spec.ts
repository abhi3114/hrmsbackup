import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryImportComponent } from './salary-import.component';

describe('SalaryImportComponent', () => {
  let component: SalaryImportComponent;
  let fixture: ComponentFixture<SalaryImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
