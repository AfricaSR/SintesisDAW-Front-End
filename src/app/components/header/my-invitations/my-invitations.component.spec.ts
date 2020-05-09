import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvitationsComponent } from './my-invitations.component';

describe('MyInvitationsComponent', () => {
  let component: MyInvitationsComponent;
  let fixture: ComponentFixture<MyInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
