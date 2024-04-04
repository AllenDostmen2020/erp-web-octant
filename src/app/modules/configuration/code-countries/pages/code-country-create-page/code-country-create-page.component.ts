import { Component, inject } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { DEFAULT_DISPLAY_FIELDS_FORM_CODE_COUNTRY, codeCountryFormGroup } from '../../helpers';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-code-country-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './code-country-create-page.component.html',
  styleUrl: './code-country-create-page.component.scss'
})
export class CodeCountryCreatePageComponent {
  private databaseStorage = inject(DatabaseStorageService);
  public configuration: ItemFormConfiguration = {
    type: 'create',
    titleModule: 'código del país',
    formGroup: codeCountryFormGroup(),
    fields: DEFAULT_DISPLAY_FIELDS_FORM_CODE_COUNTRY,
    server: { url: 'code-country' },
    afterSaveFormFn: (item)=>{
      this.databaseStorage.updateDataLocal(NameModuleDatabase.CodeCountries);
    }
  };
}
