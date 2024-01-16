import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormTemplateComponent } from './item-form-template.component';

describe('ItemFormTemplateComponent', () => {
  let component: ItemFormTemplateComponent;
  let fixture: ComponentFixture<ItemFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ItemFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
