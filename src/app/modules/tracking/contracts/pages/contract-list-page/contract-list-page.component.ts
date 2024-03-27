import { Component, inject, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { contractColumnsList } from '../../helpers';
import { ActivatedRoute } from '@angular/router';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';

@Component({
  selector: 'app-contract-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent, SpinnerDefaultComponent],
  templateUrl: './contract-list-page.component.html',
  styleUrl: './contract-list-page.component.scss'
})
export class ContractListPageComponent {
  public configurationList?: ItemListConfiguration<Contract>;

  constructor(){
    this.setConfigurationList();
  }

  private setConfigurationList() {
    this.configurationList = {
      title: 'Contratos',
      server: {
        url: 'contract',
        queryParams: { relations: 'client,clientBusinessUnit,contractPlans' },
      },
      columns: signal(contractColumnsList())
    }
  }

  public changeFilterContracts() {
    // this.configurationList!.server!.queryParams!['contract_plan_id'] = contractPlan.id;
    this.configurationList!.updateListEvent?.emit();
  }
}
