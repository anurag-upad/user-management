import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('postForm', { static: false }) postForm: NgForm;
  user: User = { eid : null, name : '', department : '', email : '',dob : new Date()};
  users: User[] = [];
  filteredName: string = '';

  constructor(private http: HttpClient,
              private usersService: UsersService) {}

  ngOnInit() {
    this.onFetchUsers();
  }
  
  onCreateUser() {
    console.log(this.postForm.value);
    //console.log(this.postForm.value.name);
    //console.log(this.postForm.value.department);
    console.log(this.user);
    
    this.usersService.saveUser(this.user)
      .subscribe(responseData => {
        this.onFetchUsers();
        this.postForm.reset();
      });
  }

  onFetchUsers() {
    this.usersService.getAllUsers()
      .subscribe(users => {
        console.log(users);
        this.users = users as User[];
      });
  }

  onClearPosts() {
    // Send Http request
  }

  onDeleteUser (userId : number){
    this.usersService.removeUser(userId)
      .subscribe(data => {
        alert('User removed !');
        this.onFetchUsers();
      });
  }

}
