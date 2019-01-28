import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedLeavesComponent } from './unapproved-leaves.component';

describe('UnapprovedLeavesComponent', () => {
  let component: UnapprovedLeavesComponent;
  let fixture: ComponentFixture<UnapprovedLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
