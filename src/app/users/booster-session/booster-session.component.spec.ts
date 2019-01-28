import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoosterSessionComponent } from './booster-session.component';

describe('BoosterSessionComponent', () => {
  let component: BoosterSessionComponent;
  let fixture: ComponentFixture<BoosterSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoosterSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoosterSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
