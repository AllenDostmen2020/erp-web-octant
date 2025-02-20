import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, emailColumn, phoneColumn, textColumn, selectableActionButton } from '@component/item-list-template/item-list-template.component';
import { User } from '@interface/user';

@Component({
    selector: 'app-user-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './user-list-page.component.html',
    styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent {
    public configList: ItemListConfiguration<User> = {
        title: 'Usuarios',
        server: {
            url: 'user',
        },
        columns: signal([
            textColumn({
                title: 'Usuario / N° Documento',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
                displayAdditionalValueFn: (item) => item?.document_number.length >= 11 ? 'RUC: ' + item?.document_number : item?.document_number.length == 8 ? 'DNI: ' + item?.document_number : 'OTRO: ' + item?.document_number,
                principal: true,
            }),
            emailColumn({
                title: 'Email',
                sort: { key: 'email' },
                gridColumn: 'auto',
                displayValueFn: (item) => {
                    console.log(item.email);
                    return item.email;
                },
            }),
            textColumn({
                title: 'Rol',
                sort: { key: 'role' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.role,
            }),
            phoneColumn({
                title: 'Celular',
                sort: { key: 'cellphone' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.cellphone,
            }),
            textColumn({
                title: 'Dirección',
                sort: { key: 'address' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.address,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        // rows: {
        //     selectable: {
        //         actions: [
        //             selectableActionButton({
        //                 icon: 'delete',
        //                 text: 'Eliminar',
        //                 fn: (items) => console.log('Eliminar', items),
        //             }),
        //             selectableActionButton({
        //                 icon: 'edit',
        //                 text: 'Editar',
        //                 fn: (items) => console.log('Editar', items),
        //             }),
        //         ]
        //     }
        // }
    }
}
