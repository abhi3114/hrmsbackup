import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentHelpdeskComponent } from './agent-helpdesk.component';

describe('AgentHelpdeskComponent', () => {
  let component: AgentHelpdeskComponent;
  let fixture: ComponentFixture<AgentHelpdeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentHelpdeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentHelpdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
