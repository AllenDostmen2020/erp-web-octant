import { Component, inject } from '@angular/core';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@interface/itemForm';
import { DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_BUSINESS_UNIT, clientBusinessUnitFormGroup } from '../../helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-business-unit-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './client-business-unit-create-page.component.html',
  styleUrl: './client-business-unit-create-page.component.scss'
})
export class ClientBusinessUnitCreatePageComponent {
  public activatedRoute = inject(ActivatedRoute)
  public configuration: ItemFormConfiguration = {
    type: 'create',
    titleModule: 'unidad de negocio',
    formGroup: clientBusinessUnitFormGroup({
      client_id: Number(this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!)
    }),
    fields: DEFAULT_DISPLAY_FIELDS_FORM_CLIENT_BUSINESS_UNIT,
    server: { url: 'client-business-unit' },
  };
}
