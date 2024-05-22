import { Component, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration, viewItemActionButton, routerLinkActionButton, defaultListFilterInputs, clickEventActionButton } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { contractColumnsList } from '../../helpers';
import { addMonths, parseISO } from 'date-fns';
import { NgClass } from '@angular/common';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';
import { FetchService } from '@service/fetch.service';
import { StatusModel } from '@interface/baseModel';
import { Router } from '@angular/router';
import { FormInput, autocompleteServerFormInput, dateRangeFormInput, selectFormInput, switchFormInput } from '@component/item-form-template/item-form-template.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contract-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent, NgClass, AlertTemplateComponent],
  templateUrl: './contract-list-page.component.html',
  styleUrl: './contract-list-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ContractListPageComponent {
  private fetch = inject(FetchService);
  private router = inject(Router);
  public type = signal<'todos' | 'por expirar' | 'expirados'>('todos')
  public configurationList: ItemListConfiguration<Contract> = {
    title: 'Contratos',
    server: {
      url: 'contract',
      queryParams: { relations: 'client,clientBusinessUnit,contractPlans' },
    },
    columns: signal(contractColumnsList()),
    rows: {
      cssClass: (item) => parseISO(item.end_date) < addMonths(new Date(), 2) ? 'next-expired' : '',
      options: [
        viewItemActionButton(),
        // routerLinkActionButton({
        //   routerLink: {
        //     url: (item)=> `../view/${item.id}/renew`
        //   },
        //   icon: 'event_repeat',
        //   text: 'Renovar',
        //   hidden: (item)=> item.status != StatusModel.Expirado,
        // }),
      ]
    },
    filter: {
      inputs: signal(this.getFilters())
    },
  };
  public alertConfiguration: WritableSignal<null | AlertConfiguration> = signal(null);

  get filterFormGroup(): FormGroup {
    return (this.configurationList.filter as any).form as FormGroup;
  }

  ngOnInit(): void {
    this.getNextExpiredContracts();
  }

  private getFilters(): FormInput[] {
    const filters = [];
    if(!this.router.url.includes('/client/view/')) {
      filters.push(autocompleteServerFormInput({
        formControlName: 'client_id',
        textLabel: 'Cliente',
        server: {
          url: 'client',
        }
      }))
    }
    return [
      ...filters,
      dateRangeFormInput({
        textLabel: 'Fecha de creación',
        formControlNameFrom: 'created_at_from',
        formControlNameTo: 'created_at_to',
      }),
      dateRangeFormInput({
        textLabel: 'Fecha de actualización',
        formControlNameFrom: 'updated_at_from',
        formControlNameTo: 'updated_at_to',
      }),
      switchFormInput({
        formControlName: 'next_expired',
        textLabel: 'Mostrar solo por expirar',
      }),
      switchFormInput({
        formControlName: 'expired',
        textLabel: 'Mostrar solo expirados',
      }),
      switchFormInput({
        textLabel: 'Incluir registros eliminados',
        formControlName: 'trashed',
      }),
      switchFormInput({
        textLabel: 'Solo registros eliminados',
        formControlName: 'only_trashed',
      }),
    ]
  }

  private async getNextExpiredContracts() {
    const data = await this.fetch.get<Contract[]>('contract/next-expired/list');
    if (data.length === 0) return;
    this.alertConfiguration!.set({
      icon: 'warning',
      title: 'Hay contratos próximos a expirar',
      description: `Hay ${data.length} contratos próximos a expirar en los próximos 2 meses. Revisa los contratos para evitar problemas.`,
      actionButton: {
        icon: 'eye',
        text: 'Ver contratos',
        fn: () => this.viewNextExpired()
      }
    });
  }
  
  public viewNextExpired(): void {
    this.filterFormGroup.get('next_expired')?.setValue(true);
    this.configurationList!.updateListEvent?.emit();
  }
}
