import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLateMarksComponent } from './all-late-marks.component';

describe('AllLateMarksComponent', () => {
  let component: AllLateMarksComponent;
  let fixture: ComponentFixture<AllLateMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLateMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLateMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
