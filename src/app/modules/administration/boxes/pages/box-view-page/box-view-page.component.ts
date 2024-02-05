import { Component } from '@angular/core';
import { ItemViewTemplateComponent, ItemViewConfiguration } from '@component/item-view-template/item-view-template.component';

@Component({
  selector: 'app-box-view-page',
  standalone: true,
  imports: [ItemViewTemplateComponent],
  templateUrl: './box-view-page.component.html',
  styleUrl: './box-view-page.component.scss'
})
export class BoxViewPageComponent {
    public config : ItemViewConfiguration = {
        titleModule: 'Caja',
        server: { url: 'box' },
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
