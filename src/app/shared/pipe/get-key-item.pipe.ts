import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getKeyItem',
    standalone: true,
})
export class GetKeyItemPipe implements PipeTransform {

    transform(item: { [key: string]: any }, key: string | false): any {
        if (!item) return '';
        if (!key) return '';
        const keys = key.split('.') ?? [];
        if (!keys.length) return '';
        try {
            if (keys.length == 6) return item[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]] ?? ''
            if (keys.length == 5) return item[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] ?? ''
            if (keys.length == 4) return item[keys[0]][keys[1]][keys[2]][keys[3]] ?? ''
            if (keys.length == 3) return item[keys[0]][keys[1]][keys[2]] ?? ''
            if (keys.length == 2) return item[keys[0]][keys[1]] ?? ''
            if (keys.length == 1) return item[keys[0]] ?? ''
        } catch (error) {
            return '';
        }
        return '';
    }

}
