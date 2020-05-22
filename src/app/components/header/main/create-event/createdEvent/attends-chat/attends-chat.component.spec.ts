import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendsChatComponent } from './attends-chat.component';

describe('AttendsChatComponent', () => {
  let component: AttendsChatComponent;
  let fixture: ComponentFixture<AttendsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendsChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
