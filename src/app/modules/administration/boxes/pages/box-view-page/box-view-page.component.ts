import { Component } from '@angular/core';
import { ItemViewTemplateComponent } from '@component/item-view-template/item-view-template.component';
import { ItemViewConfiguration } from '@interface/itemView';

@Component({
  selector: 'app-box-view-page',
  standalone: true,
  imports: [ItemViewTemplateComponent],
  templateUrl: './box-view-page.component.html',
  styleUrl: './box-view-page.component.scss'
})
export class BoxViewPageComponent {
    public config : ItemViewConfiguration = {
        itemPathServer: 'box',
        titleModule: 'Caja',
        links: [
            {
                routerLink: './detail',
                text: 'Detalle',
            },
            {
                routerLink: './box-opening/list',
                text: 'Aperturas',
            },
        ]
    }
}
