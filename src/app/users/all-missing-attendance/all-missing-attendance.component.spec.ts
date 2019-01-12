import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMissingAttendanceComponent } from './all-missing-attendance.component';

describe('AllMissingAttendanceComponent', () => {
  let component: AllMissingAttendanceComponent;
  let fixture: ComponentFixture<AllMissingAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMissingAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMissingAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
