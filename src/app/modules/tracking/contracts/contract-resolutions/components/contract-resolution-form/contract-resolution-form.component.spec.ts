import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractResolutionFormComponent } from './contract-resolution-form.component';

describe('ContractResolutionFormComponent', () => {
  let component: ContractResolutionFormComponent;
  let fixture: ComponentFixture<ContractResolutionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractResolutionFormComponent]
    });
    fixture = TestBed.createComponent(ContractResolutionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
