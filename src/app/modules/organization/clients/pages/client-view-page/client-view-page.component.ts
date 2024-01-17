import { Component } from '@angular/core';
import { ItemViewTemplateComponent } from '@component/item-view-template/item-view-template.component';
import { ItemViewConfiguration } from '@interface/itemView';

@Component({
  selector: 'app-client-view-page',
  standalone: true,
  imports: [ItemViewTemplateComponent],
  templateUrl: './client-view-page.component.html',
  styleUrl: './client-view-page.component.scss'
})
export class ClientViewPageComponent {
    public config: ItemViewConfiguration = {
        itemPathServer: 'client',
        titleModule: 'Cliente',
        links: [
            {
                routerLink: './detail',
                text: 'Detalle',
            },
        ]
    }
}
