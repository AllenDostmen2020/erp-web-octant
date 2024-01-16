import { Inject, Injectable } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
    constructor() {
        super();
        this.nextPageLabel = 'Siguiente';
        this.previousPageLabel = 'Anterior';
        this.itemsPerPageLabel = 'Items por página:';
        this.firstPageLabel = 'Primera';
        this.lastPageLabel = 'Última';
        this.getRangeLabel = (page, pageSize, length) => {
            if (length === 0 || pageSize === 0) {
                return '0 de ' + length;
            }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            // If the start index exceeds the list length, do not try and fix the end index to the end.
            const endIndex = startIndex < length ?
                Math.min(startIndex + pageSize, length) :
                startIndex + pageSize;
            return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
        };
    }


}