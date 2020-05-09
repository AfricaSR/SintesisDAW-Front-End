import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAccessComponent } from './evento-access.component';

describe('EventoAccessComponent', () => {
  let component: EventoAccessComponent;
  let fixture: ComponentFixture<EventoAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
