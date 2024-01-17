import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankEditPageComponent } from './bank-edit-page.component';

describe('BankEditPageComponent', () => {
  let component: BankEditPageComponent;
  let fixture: ComponentFixture<BankEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
