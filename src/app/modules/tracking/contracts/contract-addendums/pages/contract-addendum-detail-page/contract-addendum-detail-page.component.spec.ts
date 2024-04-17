import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddendumDetailPageComponent } from './contract-addendum-detail-page.component';

describe('ContractAddendumDetailPageComponent', () => {
  let component: ContractAddendumDetailPageComponent;
  let fixture: ComponentFixture<ContractAddendumDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractAddendumDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractAddendumDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
