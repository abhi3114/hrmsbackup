import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReimbursementComponent } from './rejected-reimbursement.component';

describe('RejectedReimbursementComponent', () => {
  let component: RejectedReimbursementComponent;
  let fixture: ComponentFixture<RejectedReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
