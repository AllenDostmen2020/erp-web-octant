import { Component } from '@angular/core';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ItemFormConfiguration } from '@interface/itemForm';
import { DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE, vehicleFormGroup } from '../../helpers';

@Component({
  selector: 'app-vehicle-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './vehicle-create-page.component.html',
  styleUrl: './vehicle-create-page.component.scss'
})
export class VehicleCreatePageComponent {
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'vehículo',
        formGroup: vehicleFormGroup(),
        fields: DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE,
        server: {url: 'vehicle'},
    };
}
