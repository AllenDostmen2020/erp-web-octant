import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractResolutionCreateComponent } from './contract-resolution-create.component';

describe('ContractResolutionCreateComponent', () => {
  let component: ContractResolutionCreateComponent;
  let fixture: ComponentFixture<ContractResolutionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractResolutionCreateComponent]
    });
    fixture = TestBed.createComponent(ContractResolutionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
