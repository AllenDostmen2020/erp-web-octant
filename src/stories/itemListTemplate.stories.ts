import { Meta, StoryObj, applicationConfig, moduleMetadata } from "@storybook/angular";
import { signal } from "@angular/core";
import { ItemListConfiguration, ItemListTemplateComponent, emailColumn, phoneColumn, selectableActionButton, textColumn } from "@component/item-list-template/item-list-template.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatNativeDateModule } from "@angular/material/core";
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from "@angular/material/paginator";


class MockActivatedRoute {
    // Puedes agregar propiedades u observables necesarios para tu historia de Storybook
    params = of({ id: '1' }); // Por ejemplo, simula los parámetros de ruta
    queryParams = of({ id: '1' }); // Por ejemplo, simula los parámetros de consulta
    snapshot = {
        paramMap: {
            get(name: string) {
                return '1';
            }
        },
        queryParamMap: {
            get(name: string) {
                return '1';
            }
        },
        params: {},
        queryParams: {},
    };
}

const meta: Meta<ItemListTemplateComponent> = {
    title: 'ItemList',
    component: ItemListTemplateComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [BrowserAnimationsModule, MatNativeDateModule],
            providers: [
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: { formFieldAppearance: 'outline', showFirstLastButtons: true, pageSizeOptions: [4, 8, 12], pageSize: 4, pageIndex: 0, } },
            ],
        }),
    ],
    argTypes: {
        configuration: {
            control: 'object',
        }
    }
};

export default meta;

type Story = StoryObj<ItemListTemplateComponent>;

export const Simple: Story = {
    args: {
        configuration: {
            title: 'Usuarios',
            server: {
                url: 'public/user',
            },
            columns: signal([
                textColumn({
                    title: 'Usuario / N° Documento',
                    sort: { key: 'name' },
                    routerLinkValue: { url: (item) => `../view/${item.id}` },
                    gridColumn: '1fr',
                    displayValueFn: (item) => item?.name ? item.name : '--',
                    displayAdditionalValueFn: (item) => item?.document_number.length >= 11 ? 'RUC: ' + item?.document_number : item?.document_number.length == 8 ? 'DNI: ' + item?.document_number : 'OTRO: ' + item?.document_number,
                }),
                emailColumn({
                    title: 'Email',
                    sort: { key: 'email' },
                    gridColumn: 'auto',
                    displayValueFn: (item) => item.email,
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
            ]),
        } as ItemListConfiguration,
    },
};

export const Selectable: Story = {
    args: {
        configuration: {
            title: 'Usuarios',
            server: {
                url: 'public/user',
            },
            rows: {
                selectable: {
                    actions: [
                        selectableActionButton({
                            icon: 'delete',
                            fn: (selectedItems) => alert(`items seleccionados: ${selectedItems.length}`),
                        })
                    ]
                }
            },
            columns: signal([
                textColumn({
                    title: 'Usuario / N° Documento',
                    sort: { key: 'name' },
                    routerLinkValue: { url: (item) => `../view/${item.id}` },
                    gridColumn: '1fr',
                    displayValueFn: (item) => item?.name ? item.name : '--',
                    displayAdditionalValueFn: (item) => item?.document_number.length >= 11 ? 'RUC: ' + item?.document_number : item?.document_number.length == 8 ? 'DNI: ' + item?.document_number : 'OTRO: ' + item?.document_number,
                }),
                emailColumn({
                    title: 'Email',
                    sort: { key: 'email' },
                    gridColumn: 'auto',
                    displayValueFn: (item) => item.email,
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
            ]),
        } as ItemListConfiguration
    },
};