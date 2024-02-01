import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { Contract } from '@interface/contract';
import { ItemFormConfiguration } from '@interface/itemForm';
import { ClientContractDocumentItemFormComponent } from '../../components/client-contract-document-item-form/client-contract-document-item-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from '@service/events.service';

export interface ItemFormDocumentContractItem {
    edit?: boolean;
    inputAutoFocus?: 'period';
    contract: Contract,
    periods: number,
}

@Component({
    selector: 'app-client-document-create',
    standalone: true,
    imports: [ItemFormTemplateComponent, ClientContractDocumentItemFormComponent],
    templateUrl: './client-document-create.component.html',
    styleUrl: './client-document-create.component.scss'
})
export class ClientDocumentCreateComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private eventsService = inject(EventsService);
    private subscription?: Subscription;
    public items: WritableSignal<ItemFormDocumentContractItem[]> = signal([]);
    public formConfiguration: ItemFormConfiguration = {
        title: "Nuevo Documento",
        titleModule: "documento",
        type: "create",
        server: {
            url: 'client-document',
        },
        formGroup: new FormGroup({}),
    }
    ngOnInit(){
        this.subscription = this.eventsService.getEventObservable.subscribe(event => {
            if(event.name == 'add-client-contract'){
                console.log(event.data);

                this.addContract(event.data);
            }
        })
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    addContract(contract: Contract) {
        this.items.update((data) => [...data, { contract, periods: 1 }]);
    }

    newAdd(event: Event) {
        event.preventDefault()
        const clientId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id');
        this.router.navigate([{ outlets: { 'route-lateral': `client/${clientId}/contract/add` } }]);

    }
}
