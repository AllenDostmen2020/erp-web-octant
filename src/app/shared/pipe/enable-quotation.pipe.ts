import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enableQuotation',
    standalone: true
})
export class EnableQuotationPipe implements PipeTransform {

    transform(enable: any, args: any[]): boolean {
        const [authUser, quotation] = args;
        if (authUser.id != quotation.seller_id && authUser.id != quotation.project_manager_id && quotation.last_quotation_workflow?.status == 'cotizando') {
            enable = true;
        }
        return true;
    }

}
