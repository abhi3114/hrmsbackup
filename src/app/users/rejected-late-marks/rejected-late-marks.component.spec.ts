import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedLateMarksComponent } from './rejected-late-marks.component';

describe('RejectedLateMarksComponent', () => {
  let component: RejectedLateMarksComponent;
  let fixture: ComponentFixture<RejectedLateMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedLateMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedLateMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
