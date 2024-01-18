import { Component, inject } from '@angular/core';
import { VehicleTypeCreatePageComponent } from '../vehicle-type-create-page/vehicle-type-create-page.component';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
  selector: 'app-vehicle-type-edit-page',
  standalone: true,
  imports: [ItemFormTemplateComponent],
  templateUrl: './vehicle-type-edit-page.component.html',
  styleUrl: './vehicle-type-edit-page.component.scss'
})
export class VehicleTypeEditPageComponent extends VehicleTypeCreatePageComponent {
    private activatedRoute = inject(ActivatedRoute);

    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'vehicle-type';
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }

}
