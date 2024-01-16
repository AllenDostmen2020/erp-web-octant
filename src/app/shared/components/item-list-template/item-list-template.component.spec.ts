import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListTemplateComponent } from './item-list-template.component';

describe('ItemListTemplateComponent', () => {
  let component: ItemListTemplateComponent;
  let fixture: ComponentFixture<ItemListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ItemListTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
