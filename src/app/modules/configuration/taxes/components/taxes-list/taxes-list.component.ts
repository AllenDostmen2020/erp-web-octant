import { Component, OnInit, inject } from '@angular/core';
import { getTaxe } from '@helper/index';
import { Taxe } from '@interface/taxe';
import { FetchService } from '@service/fetch.service';
import { TaxesListCardComponent } from '../taxes-list-card/taxes-list-card.component';

@Component({
    selector: 'app-taxes-list',
    templateUrl: './taxes-list.component.html',
    standalone: true,
    imports: [TaxesListCardComponent],
    styleUrls: ['./taxes-list.component.scss'],
})
export class TaxesListComponent implements OnInit {

    public data: Taxe[] = [];
    public total_data: number = 0;
    public loading: boolean = false;
    private fetch = inject(FetchService);

    ngOnInit(): void {
        this.getData();
    }


    private async getData() {
        this.data = await this.fetch.get('taxe');

    }

    public async updateItem(index: number, data: Taxe) {
        const response: any = await this.fetch.put('taxe/' + this.data[index].id, data);
        if (!response) return;
        this.data[index] = response;

    }
}
