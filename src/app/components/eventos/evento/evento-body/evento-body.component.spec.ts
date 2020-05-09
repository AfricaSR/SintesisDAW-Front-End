import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoBodyComponent } from './evento-body.component';

describe('EventoBodyComponent', () => {
  let component: EventoBodyComponent;
  let fixture: ComponentFixture<EventoBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
