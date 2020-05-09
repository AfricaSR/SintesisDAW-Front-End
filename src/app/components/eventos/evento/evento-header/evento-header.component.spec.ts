import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoHeaderComponent } from './evento-header.component';

describe('EventoHeaderComponent', () => {
  let component: EventoHeaderComponent;
  let fixture: ComponentFixture<EventoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
