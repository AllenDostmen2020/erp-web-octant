import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankListPageComponent } from './bank-list-page.component';

describe('BankListPageComponent', () => {
  let component: BankListPageComponent;
  let fixture: ComponentFixture<BankListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
