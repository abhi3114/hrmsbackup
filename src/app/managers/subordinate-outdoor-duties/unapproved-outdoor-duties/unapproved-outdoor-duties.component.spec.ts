import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedOutdoorDutiesComponent } from './unapproved-outdoor-duties.component';

describe('UnapprovedOutdoorDutiesComponent', () => {
  let component: UnapprovedOutdoorDutiesComponent;
  let fixture: ComponentFixture<UnapprovedOutdoorDutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedOutdoorDutiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedOutdoorDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
