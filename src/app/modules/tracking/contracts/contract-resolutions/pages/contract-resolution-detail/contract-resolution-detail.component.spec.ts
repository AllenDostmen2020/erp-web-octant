import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractResolutionDetailComponent } from './contract-resolution-detail.component';

describe('ContractResolutionDetailComponent', () => {
  let component: ContractResolutionDetailComponent;
  let fixture: ComponentFixture<ContractResolutionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractResolutionDetailComponent]
    });
    fixture = TestBed.createComponent(ContractResolutionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
