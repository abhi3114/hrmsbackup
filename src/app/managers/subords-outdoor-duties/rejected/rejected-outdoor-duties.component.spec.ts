import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedOutdoorDutiesComponent } from './rejected-outdoor-duties.component';

describe('RejectedOutdoorDutiesComponent', () => {
  let component: RejectedOutdoorDutiesComponent;
  let fixture: ComponentFixture<RejectedOutdoorDutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedOutdoorDutiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedOutdoorDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
