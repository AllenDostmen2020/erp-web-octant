import { Component } from '@angular/core';
import { VehicleUnsubscribeCreatePageComponent } from '../vehicle-unsubscribe-create-page/vehicle-unsubscribe-create-page.component';

@Component({
  selector: 'app-vehicle-unsubscribe-edit-page',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-unsubscribe-edit-page.component.html',
  styleUrl: './vehicle-unsubscribe-edit-page.component.scss'
})
export class VehicleUnsubscribeEditPageComponent extends VehicleUnsubscribeCreatePageComponent {

    constructor() {
        super();
        this.configuration.type = 'update';
        this.configuration.itemId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }
}
