import { Component, inject } from '@angular/core';
import { VehicleCreatePageComponent } from '../vehicle-create-page/vehicle-create-page.component';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-vehicle-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './vehicle-edit-page.component.html',
  styleUrl: './vehicle-edit-page.component.scss'
})
export class VehicleEditPageComponent extends VehicleCreatePageComponent {
    private activatedRoute = inject(ActivatedRoute);

    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'vehicle';
        this.configuration.itemQueryParamsString = 'relations=client,vehicleType';
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }
}
