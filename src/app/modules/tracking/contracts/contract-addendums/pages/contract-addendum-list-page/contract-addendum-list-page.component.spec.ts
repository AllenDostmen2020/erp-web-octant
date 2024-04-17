import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddendumListPageComponent } from './contract-addendum-list-page.component';

describe('ContractAddendumListPageComponent', () => {
  let component: ContractAddendumListPageComponent;
  let fixture: ComponentFixture<ContractAddendumListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractAddendumListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractAddendumListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
