import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

@Pipe({
  name: 'localItem',
  standalone: true
})
export class LocalItemPipe implements PipeTransform {

  private databaseStorage = inject(DatabaseStorageService);

  async transform(id: number | null | undefined, module: NameModuleDatabase): Promise<any> {
    if(!id) return null;
    return await this.databaseStorage.getOne(module, id);
  }

}
