import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCreatePageComponent } from './contract-create-page.component';

describe('ContractCreatePageComponent', () => {
  let component: ContractCreatePageComponent;
  let fixture: ComponentFixture<ContractCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
