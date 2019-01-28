import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingSalaryComponent } from './missing-salary.component';

describe('MissingSalaryComponent', () => {
  let component: MissingSalaryComponent;
  let fixture: ComponentFixture<MissingSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
