import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDrawerTemplateComponent } from './panel-drawer-template.component';

describe('PanelDrawerTemplateComponent', () => {
  let component: PanelDrawerTemplateComponent;
  let fixture: ComponentFixture<PanelDrawerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDrawerTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelDrawerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
