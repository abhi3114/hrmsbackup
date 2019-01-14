import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeavesComponent } from './all-leaves.component';

describe('AllLeavesComponent', () => {
  let component: AllLeavesComponent;
  let fixture: ComponentFixture<AllLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
