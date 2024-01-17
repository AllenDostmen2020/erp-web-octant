import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSidenavComponent } from './settings-sidenav.component';

describe('SettingsSidenavComponent', () => {
  let component: SettingsSidenavComponent;
  let fixture: ComponentFixture<SettingsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
