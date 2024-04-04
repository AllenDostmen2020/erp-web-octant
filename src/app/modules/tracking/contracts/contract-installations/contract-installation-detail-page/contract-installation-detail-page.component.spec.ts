import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInstallationDetailPageComponent } from './contract-installation-detail-page.component';

describe('ContractInstallationDetailPageComponent', () => {
  let component: ContractInstallationDetailPageComponent;
  let fixture: ComponentFixture<ContractInstallationDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractInstallationDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractInstallationDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
