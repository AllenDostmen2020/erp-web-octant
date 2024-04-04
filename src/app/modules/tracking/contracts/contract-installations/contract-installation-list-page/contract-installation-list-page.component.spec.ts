import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInstallationListPageComponent } from './contract-installation-list-page.component';

describe('ContractInstallationListPageComponent', () => {
  let component: ContractInstallationListPageComponent;
  let fixture: ComponentFixture<ContractInstallationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractInstallationListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractInstallationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
