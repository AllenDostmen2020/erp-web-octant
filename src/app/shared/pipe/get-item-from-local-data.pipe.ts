import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'getItemFromLocalData',
  standalone: true
})
export class GetItemFromLocalDataPipe implements PipeTransform {

  private databaseStorage = inject(DatabaseStorageService);

  transform<T = any>(id: number | null, nameModuleDatabase: NameModuleDatabase): Observable<T | null | undefined> {
    return new Observable((subscriber) => {
      if(!id) {
        subscriber.next(null);
        subscriber.complete();
      } else {
        this.databaseStorage.getOne<T>(nameModuleDatabase, id).then(item => {
          subscriber.next(item);
          subscriber.complete();
        });
      }
    });
  }

}
