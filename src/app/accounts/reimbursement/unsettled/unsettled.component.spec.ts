import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsettledComponent } from './unsettled.component';

describe('UnsettledComponent', () => {
  let component: UnsettledComponent;
  let fixture: ComponentFixture<UnsettledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsettledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsettledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
