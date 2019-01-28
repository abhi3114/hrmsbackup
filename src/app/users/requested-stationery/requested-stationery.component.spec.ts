import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedStationeryComponent } from './requested-stationery.component';

describe('RequestedStationeryComponent', () => {
  let component: RequestedStationeryComponent;
  let fixture: ComponentFixture<RequestedStationeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedStationeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedStationeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
