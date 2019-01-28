import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedLateMarksComponent } from './approved-late-marks.component';

describe('ApprovedLateMarksComponent', () => {
  let component: ApprovedLateMarksComponent;
  let fixture: ComponentFixture<ApprovedLateMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedLateMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedLateMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
