import { Component, OnInit } from '@angular/core';
import { IUser, UserClass } from 'src/app/model/user.model';
import { UserService } from '../../service/user.service';
import { User } from '@sentry/types';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  usersList: IUser[];

  anUser: UserClass;
  isEditMode: boolean = false;
  errorBlock: boolean;
  errorText: any;

  constructor(private _userService: UserService) { 
    this.isEditMode = false;
    this.anUser = new UserClass();
  }

  ngOnInit() {
    this.getAllUsers();
    this.isEditMode = false;
    console.log(this.anUser);
  }

  getAllUsers(){
    this._userService.getAllUsers().subscribe((res: any) => {
      if(res['success'] == true) {
        this.usersList = res['data'];
        console.log(this.usersList);
      } else {
        console.log("Error: could not get all users");
      }
    }, (error: any) => {
      this.errorBlock = true;
      this.errorText = error['message'];
    })
  }

  addNewUser(anUser: UserClass) {
    this._userService.addNewUser(anUser).subscribe((res: any)=>{
      if (res['success']) {
        alert('Add user Successfull');
        this.getAllUsers();
        this.resetPage();
      } else {
        alert('Add user failed');
      }
    }, error => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
  }

  editUser(anUser: UserClass) {
    this.anUser = anUser;
    this.isEditMode = true;
  }

  updateUser(anUser: UserClass) {
    this._userService.updateUser(this.anUser).subscribe((response: any)=>{
      if (response['success']) {
        alert('Update user Successfull');
        this.getAllUsers();
        this.resetPage();
      } else {
        alert('Update user failed');
      }
    }, error => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
  }

  
  deleteUser(anUserId: number) {
    this._userService.deleteUser(anUserId).subscribe((response: any)=>{
      if (response['success']) {
        alert('User Delete successfull');
        this.getAllUsers();
      } else {
        alert(response['message']);
      }

    }, error => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
   
  }

  resetPage() {
    this.anUser.firstName = null;
    this.anUser.lastName = null;
    this.anUser.employeeId = null;
  }

}
