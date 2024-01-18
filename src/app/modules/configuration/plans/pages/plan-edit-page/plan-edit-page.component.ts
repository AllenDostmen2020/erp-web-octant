import { Component, inject } from '@angular/core';
import { PlanCreatePageComponent } from '../plan-create-page/plan-create-page.component';
import { ActivatedRoute } from '@angular/router';
import { ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';

@Component({
    selector: 'app-plan-edit-page',
    standalone: true,
    imports: [ItemFormTemplateComponent],
    templateUrl: './plan-edit-page.component.html',
    styleUrl: './plan-edit-page.component.scss'
})
export class PlanEditPageComponent extends PlanCreatePageComponent {
    private activatedRoute = inject(ActivatedRoute);

    constructor(
    ) {
        super();
        this.configuration.type = 'update';
        this.configuration.itemPathServer = 'plan';
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.configuration.hiddeFields = true;
    }
}
