import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddendumFormComponent } from './contract-addendum-form.component';

describe('ContractAddendumFormComponent', () => {
  let component: ContractAddendumFormComponent;
  let fixture: ComponentFixture<ContractAddendumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractAddendumFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractAddendumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
