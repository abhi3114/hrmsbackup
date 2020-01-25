import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedReimbursementComponent } from './approved-reimbursement.component';

describe('ApprovedReimbursementComponent', () => {
  let component: ApprovedReimbursementComponent;
  let fixture: ComponentFixture<ApprovedReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
