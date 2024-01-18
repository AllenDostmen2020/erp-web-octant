import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCreatePageComponent } from './bank-create-page.component';

describe('BankCreatePageComponent', () => {
  let component: BankCreatePageComponent;
  let fixture: ComponentFixture<BankCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
