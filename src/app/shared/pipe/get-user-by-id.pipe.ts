import { Pipe, PipeTransform, inject } from '@angular/core';
import { User } from '@interface/user';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'getUserById',
  standalone: true
})
export class GetUserByIdPipe implements PipeTransform {

  private databaseStorage = inject(DatabaseStorageService);

  async transform(id: number | null | undefined): Promise<User | null | undefined> {
    if(!id) return null;
    return await this.databaseStorage.getOne<User>(NameModuleDatabase.Users, id);
  }

}
