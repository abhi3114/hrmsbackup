import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAndFinalComponent } from './full-and-final.component';

describe('FullAndFinalComponent', () => {
  let component: FullAndFinalComponent;
  let fixture: ComponentFixture<FullAndFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullAndFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAndFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
