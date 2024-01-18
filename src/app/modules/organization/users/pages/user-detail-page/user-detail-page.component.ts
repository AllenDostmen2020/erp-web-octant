import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ItemDetailConfiguration } from '@interface/itemDetail';
import { User } from '@interface/user';

@Component({
  selector: 'app-user-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './user-detail-page.component.html',
  styleUrl: './user-detail-page.component.scss'
})
export class UserDetailPageComponent {
    public configuration: ItemDetailConfiguration<User> = {
        title: 'Detalles',
        subtitle: false,
        itemPathServer: 'user',
        backButton: false,
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'T. Documento',
                        displayValueFn: (item) => item.document_type.toUpperCase()
                    },
                    {
                        title: 'N° Documento',
                        displayValueFn: (item) => item.document_number
                    },
                    {
                        title: 'Nombre',
                        displayValueFn: (item) => item.name
                    },
                    {
                        title: 'Rol',
                        displayValueFn: (item) => item.role
                    },
                    {
                        title: 'Fecha de nacimiento',
                        displayValueFn: (item) => item.birth_date,
                        type: 'date',
                        dateFormat: 'dd/MM/yyyy'
                    },
                    {
                        title: 'Dirección',
                        displayValueFn: (item) => item.address
                    },
                    {
                        title: 'Teléfono',
                        displayValueFn: (item) => item.phone,
                        type: 'phone'
                    },
                    {
                        title: 'Email',
                        displayValueFn: (item) => item.email,
                        type: 'email',
                    },
                ]
            },
            registerDataGroupDetail(),
        ]
    }
}
