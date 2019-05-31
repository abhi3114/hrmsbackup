import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedMissingAttendanceComponent } from './rejected-missing-attendance.component';

describe('RejectedMissingAttendanceComponent', () => {
  let component: RejectedMissingAttendanceComponent;
  let fixture: ComponentFixture<RejectedMissingAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedMissingAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedMissingAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
