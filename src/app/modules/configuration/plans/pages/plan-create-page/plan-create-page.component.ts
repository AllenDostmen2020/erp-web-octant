import { Component, inject } from '@angular/core';
import { ItemFormConfiguration } from '@interface/itemForm';
import { DEFAULT_DISPLAY_FIELDS_FORM_PLAN, planFormGroup } from '../../helpers';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { Plan } from '@interface/plan';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-plan-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './plan-create-page.component.html',
  styleUrl: './plan-create-page.component.scss'
})
export class PlanCreatePageComponent {
    private databaseStorage = inject(DatabaseStorageService)
    public configuration: ItemFormConfiguration = {
        type: 'create',
        titleModule: 'plan',
        formGroup: planFormGroup(),
        parseItemAfterSaveFormFn: (item: Plan) => {
            this.databaseStorage.updateDataLocal(NameModuleDatabase.Plans);
          },
        fields: DEFAULT_DISPLAY_FIELDS_FORM_PLAN,
        pathServer: 'plan',
    };
}
