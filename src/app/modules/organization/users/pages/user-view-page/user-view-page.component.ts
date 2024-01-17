import { Component } from '@angular/core';
import { ItemViewTemplateComponent } from '@component/item-view-template/item-view-template.component';
import { ItemViewConfiguration } from '@interface/itemView';

@Component({
  selector: 'app-user-view-page',
  standalone: true,
  imports: [ItemViewTemplateComponent],
  templateUrl: './user-view-page.component.html',
  styleUrl: './user-view-page.component.scss'
})
export class UserViewPageComponent {
    public config: ItemViewConfiguration = {
        itemPathServer: 'user',
        titleModule: 'Usuario',
        links: [
            {
                routerLink: './detail',
                text: 'Detalle',
            },
        ]
    }
}
