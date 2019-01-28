import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedOutdoorDutiesComponent } from './approved-outdoor-duties.component';

describe('ApprovedOutdoorDutiesComponent', () => {
  let component: ApprovedOutdoorDutiesComponent;
  let fixture: ComponentFixture<ApprovedOutdoorDutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedOutdoorDutiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedOutdoorDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
