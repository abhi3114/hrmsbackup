import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedMissingAttendancesComponent } from './rejected-missing-attendances.component';

describe('RejectedMissingAttendancesComponent', () => {
  let component: RejectedMissingAttendancesComponent;
  let fixture: ComponentFixture<RejectedMissingAttendancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedMissingAttendancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedMissingAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
