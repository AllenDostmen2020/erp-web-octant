import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPageComponent } from './user-view-page.component';

describe('UserViewPageComponent', () => {
  let component: UserViewPageComponent;
  let fixture: ComponentFixture<UserViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
