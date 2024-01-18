import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesListCardComponent } from './taxes-list-card.component';

describe('TaxesListCardComponent', () => {
  let component: TaxesListCardComponent;
  let fixture: ComponentFixture<TaxesListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxesListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
