import { Component, OnInit } from '@angular/core';
import { IUser, UserClass } from 'src/app/model/user.model';
import { UserService } from '../../service/user.service';
import { User } from '@sentry/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { consoleSandbox } from '@sentry/utils';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {

  usersList: UserClass[];
  filteredUserList: UserClass[];
  anUser: UserClass;
  isEditMode: boolean = false;
  errorBlock: boolean = false;
  errorText: any;
  mainFormGroup: FormGroup;
  
  _AddUpdateButton: string = "Add";
  
  public _searchUserString: string;
  private _sortUserString: string;
  isDesc: boolean;

  constructor(private _userService: UserService, private _formBuilder: FormBuilder) { 
    this.initMainForm();
    this.anUser = new UserClass();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  // Initialize the form to collect user details
  initMainForm(){
    this.mainFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
      userId: ''
    });
    this.isEditMode = false;
    this._AddUpdateButton = "Add";
  }

  public get searchUserString(): string {
    return this._searchUserString;
  }
  public set searchUserString(value: string) {
    this._searchUserString = value;
    this.filteredUserList = this.filterUserByName(this._searchUserString);
  }

  filterUserByName(searchString: string): UserClass[] {
    return this.usersList.filter(user => 
      user.firstName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe((res: any) => {
      if(res['success'] == true) {
        this.usersList = res['data'];
        this.filteredUserList = res['data'];
      } else {
        alert('Get users failed.' + res['message']);
      }
    }, (error: any) => {
      alert('Get users failed.' + error['message']);
    })
  }

  // Load User Form based on Users choice
  addOrUpdateUser() {

    this.anUser.firstName = this.mainFormGroup.controls['firstName'].value;
    this.anUser.lastName = this.mainFormGroup.controls['lastName'].value;
    this.anUser.employeeId = this.mainFormGroup.controls['employeeId'].value;
    if (this.isEditMode) {
      this.anUser.userId = this.mainFormGroup.controls['userId'].value;
      this.updateUser(this.anUser);
    } else  {
       this.addNewUser(this.anUser);
    }
  }

  addNewUser(anUser: UserClass) {

    this._userService.addNewUser(anUser).subscribe((res: any)=>{

      if (res['success']) {
        alert('Add user Successfull');
        this.getAllUsers();
        this.resetPage();
        this.resetUserAddUpdateForm();
      } else {
        alert('Add user failed' + res['message']);
      }
    }, error => {
      alert('Add user failed' + error['message']);
    });
  }

  editUser(anUser: UserClass) {
    this.isEditMode = true;
    this.mainFormGroup.reset();
    this._AddUpdateButton = "Update";
    this.mainFormGroup = this._formBuilder.group({
      firstName: [anUser.firstName, Validators.required],
      lastName: [anUser.lastName, Validators.required],
      employeeId: [anUser.employeeId, Validators.required],
      userId: [anUser.userId, Validators.required]
    });
  }

  updateUser(anUser: UserClass) {
    this._userService.updateUser(anUser).subscribe((response: any)=>{
      if (response['success']) {
        alert('Update user Successfull');
        this.initMainForm();
        this.getAllUsers();
      } else {
        alert('Update user failed' + response['message']);
      }
    }, error => {
      alert('Update user failed' + error['message']);

      // this.errorBlock = true;
      // this.errorText = error['message'];
    });
  }

  
  deleteUser(anUserId: number) {
    this._userService.deleteUser(anUserId).subscribe((response: any)=>{
      if (response['success']) {
        alert('User Delete successfull');
        this.getAllUsers();
      } else {
        alert('Delete user failed.' + response['message']);
      }
    }, error => {
      alert('Delete user failed.' + error['message']);
    });
   
  }

  resetPage() {
    this.anUser.firstName = null;
    this.anUser.lastName = null;
    this.anUser.employeeId = null;
    this.isEditMode = false;
  }

  resetUserAddUpdateForm() {
    this.mainFormGroup.reset();
    this.isEditMode = false;
  }

}
