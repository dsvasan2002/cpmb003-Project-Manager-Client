import { Component, OnInit } from '@angular/core';
import { IUser, UserClass } from 'src/app/model/user.model';
import { UserService } from '../../service/user.service';
// import { User } from '@sentry/types';
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
  errorBlock: boolean;
  errorText: any;
  mainFormGroup: FormGroup;
  
  _AddUpdateButton: string = "Add";
  
  private _searchUserString: string;
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
        //Error: could not get all users"
      }
    }, (error: any) => {
      this.errorBlock = true;
      this.errorText = error['message'];
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
      } else {
        alert('Add user failed' + res['message']);
      }
    }, error => {
      this.errorBlock = true;
      this.errorText = error['message'];
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

  //Sort user List based on user choice
  sortUsersList(sortStr: string) {
    this.isDesc = !this.isDesc; //change the direction    
    let direction = this.isDesc ? 1 : -1;

    this.filteredUserList = this.filteredUserList.sort(function(a, b){
      if (a[sortStr] < b[sortStr]) {
          return -1 * direction;
      } else if( a[sortStr] > b[sortStr]) {
          return 1 * direction;
      } else {
          return 0;
      }
    });
  }

  resetPage() {
    this.anUser.firstName = null;
    this.anUser.lastName = null;
    this.anUser.employeeId = null;
  }

  resetUserAddUpdateForm() {
    this.mainFormGroup.reset();
    this.isEditMode = false;
  }

}
