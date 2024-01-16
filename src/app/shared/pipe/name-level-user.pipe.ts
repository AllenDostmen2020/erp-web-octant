import { Pipe, PipeTransform } from '@angular/core';
import { User, UserlevelEnum } from '@interface/user';

@Pipe({
  name: 'nameLevelUser',
  standalone: true
})
export class NameLevelUserPipe implements PipeTransform {

  transform(user: User): string {
    const values = Object.entries(UserlevelEnum);
    const nameLevel = values.find(value => {
      return value[1] == user.level
    })
    return nameLevel ? nameLevel[0] : '';
  }

}
