import { Component, inject } from '@angular/core';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE_TYPE, vehicleTypeFormGroup } from '../../helpers';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { VehicleType } from '@interface/vehicleType';

@Component({
  selector: 'app-vehicle-type-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './vehicle-type-create-page.component.html',
  styleUrl: './vehicle-type-create-page.component.scss'
})
export class VehicleTypeCreatePageComponent {
  private databaseStorage = inject(DatabaseStorageService)
  public configuration: ItemFormConfiguration<VehicleType> = {
    type: 'create',
    titleModule: 'tipo de vehículo',
    formGroup: vehicleTypeFormGroup(),
    afterSaveFormFn: (item) => {
      this.databaseStorage.updateDataLocal(NameModuleDatabase.VehicleTypes)
    },
    fields: DEFAULT_DISPLAY_FIELDS_FORM_VEHICLE_TYPE,
    server: { url: 'vehicle-type' },
  };
}
