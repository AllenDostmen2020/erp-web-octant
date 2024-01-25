import { Component, inject } from '@angular/core';
import { ItemFormConfiguration } from '@interface/itemForm';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE_TYPE, vehicleTypeFormGroup } from '../../helpers';
import { VehicleType } from '@interface/vehicleType';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-vehicle-type-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './vehicle-type-create-page.component.html',
  styleUrl: './vehicle-type-create-page.component.scss'
})
export class VehicleTypeCreatePageComponent {
    private databaseStorage = inject(DatabaseStorageService)
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'tipo de vehículo',
        formGroup: vehicleTypeFormGroup(),
        afterSaveFormFn: (item) => {
            this.databaseStorage.updateDataLocal(NameModuleDatabase.VehicleTypes)
          },
        fields: DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE_TYPE,
        pathServer: 'vehicle-type',
    };
}
