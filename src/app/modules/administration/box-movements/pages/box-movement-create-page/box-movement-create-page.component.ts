import { Component } from '@angular/core';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { getFormBoxMovementGroup } from '../../helpers';
import { BoxMovementFormComponent } from '../../components/box-movement-form/box-movement-form.component';

@Component({
  selector: 'app-box-movement-create-page',
  standalone: true,
  imports: [ItemFormTemplateComponent, BoxMovementFormComponent],
  templateUrl: './box-movement-create-page.component.html',
  styleUrl: './box-movement-create-page.component.scss'
})
export class BoxMovementCreatePageComponent {
  public configuration: ItemFormConfiguration = {
    titleModule: 'movimiento',
    server: { url: 'box-movement' },
    type: 'create',
    formGroup: getFormBoxMovementGroup(),
  }
}
