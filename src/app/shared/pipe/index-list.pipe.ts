import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexList',
  standalone: true,
})
export class IndexListPipe implements PipeTransform {

  transform(index: number, [pageIndex,PageSize]: [number, number]): unknown {
    return pageIndex * PageSize + (index + 1);
  }

}
