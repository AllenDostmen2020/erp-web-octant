import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBoxTransferFormComponent } from './client-box-transfer-form.component';

describe('ClientBoxTransferFormComponent', () => {
  let component: ClientBoxTransferFormComponent;
  let fixture: ComponentFixture<ClientBoxTransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBoxTransferFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBoxTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
