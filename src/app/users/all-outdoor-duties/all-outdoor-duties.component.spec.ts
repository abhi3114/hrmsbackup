import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOutdoorDutiesComponent } from './all-outdoor-duties.component';

describe('AllOutdoorDutiesComponent', () => {
  let component: AllOutdoorDutiesComponent;
  let fixture: ComponentFixture<AllOutdoorDutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOutdoorDutiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOutdoorDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
