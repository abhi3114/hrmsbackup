import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorUnsettledComponent } from './error-unsettled.component';

describe('ErrorUnsettledComponent', () => {
  let component: ErrorUnsettledComponent;
  let fixture: ComponentFixture<ErrorUnsettledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorUnsettledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorUnsettledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
