import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'sortByDeptt'
})
export class SortByDepttPipe implements PipeTransform {

  transform(users: User[], propName : string): User[] {
    if(!users || users.length===0){
      return users;
    }else{
      return users.sort((a,b) => a[propName] > b[propName] ? 1 : -1);
    }
  }

}
