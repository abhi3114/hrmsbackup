import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedReimbursementComponent } from './unapproved-reimbursement.component';

describe('UnapprovedReimbursementComponent', () => {
  let component: UnapprovedReimbursementComponent;
  let fixture: ComponentFixture<UnapprovedReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
