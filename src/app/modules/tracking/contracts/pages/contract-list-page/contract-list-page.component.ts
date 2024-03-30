import { Component, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { contractColumnsList } from '../../helpers';
import { addMonths, parseISO } from 'date-fns';
import { NgClass } from '@angular/common';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';
import { FetchService } from '@service/fetch.service';

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
    }
  };
  public alertConfiguration: WritableSignal<null|AlertConfiguration> = signal(null);

  ngOnInit(): void {
    this.getNextExpiredContracts();
  }

  private async getNextExpiredContracts() {
    const data = await this.fetch.get<Contract[]>('contract/next-expired/list');
    if(data.length === 0) return;
    this.alertConfiguration!.set({
      icon: 'warning',
      title: 'Hay contratos próximos a expirar',
      description: `Hay ${data.length} contratos próximos a expirar en los próximos 2 meses. Revisa los contratos para evitar problemas.`,
      actionButton: {
        icon: 'eye',
        text: 'Ver contratos',
        fn: () => this.changeFilterContracts('por expirar')
      }
    });
  }
  
  public changeFilterContracts(type: 'todos' | 'por expirar' | 'expirados') {
    if(type == this.type()) return;
    this.type.set(type);
    if(type === 'por expirar') {
      this.configurationList!.server!.queryParams!['next_expired'] = 'true';
      this.configurationList!.server!.queryParams!['expired'] = null;
    } else if (type === 'expirados') {
      this.configurationList!.server!.queryParams!['expired'] = 'true';
      this.configurationList!.server!.queryParams!['next_expired'] = null;
    } else {
      this.configurationList!.server!.queryParams!['next_expired'] = null;
      this.configurationList!.server!.queryParams!['expired'] = null;
    }
    this.configurationList!.updateListEvent?.emit();
  }
}
