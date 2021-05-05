import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(users: User[], filteredName : string, propName : string): User[] {
    if(filteredName === undefined || filteredName ==='' || filteredName.trim().length ===0){
      return users;
    }else{
      const filteredUsers : User[] = [];
      for(let user of users){
        let username=user[propName] as string;
        if(username.toUpperCase() === filteredName.toUpperCase() 
          || username.toUpperCase().startsWith(filteredName.toUpperCase())){
          filteredUsers.push(user);
        }
      }
      return filteredUsers;
    }
   
  }

}
