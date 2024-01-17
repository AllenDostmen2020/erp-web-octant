import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditPageComponent } from './account-edit-page.component';

describe('AccountEditPageComponent', () => {
  let component: AccountEditPageComponent;
  let fixture: ComponentFixture<AccountEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
