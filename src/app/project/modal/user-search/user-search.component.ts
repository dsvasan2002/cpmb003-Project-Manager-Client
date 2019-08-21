import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserClass } from 'src/app/model/user.model';

declare var $ :any;

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  @Output() selectedUser = new EventEmitter<UserClass>();

  usersList: UserClass[];
  filteredUserList: UserClass[];
  anUser: UserClass;
  errorBlock: boolean = false;
  errorText: any;
  _searchUserString: string;
  selectedUserId: number;
  enableAddButton: boolean = false;

  constructor(private _userService: UserService) { 
    this.anUser = new UserClass();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe((res: any) => {
      if (res['success'] == true) {
        this.usersList = res['data'];
        this.filteredUserList = res['data'];
      } else {
        //Error: could not get all users
        this.errorBlock = false;
      }
    })
  }

  public set searchUserString(value: string) {
    this._searchUserString = value;
    this.filteredUserList = this.filterUserByName(this._searchUserString);
  }

  public get searchUserString(): string {
    return this._searchUserString;
  }

  filterUserByName(searchString: string): UserClass[] {
    return this.usersList.filter(user => 
      user.firstName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  selectUser(anUserId:number) {
    console.log("selected User id:" + anUserId);
    this._userService.getAnUser(anUserId).subscribe((res: any)=>{
      if (res['success'] == true) {
        this.anUser = res['data'];
        console.log("selected User:" + this.anUser);
        this.enableAddButton = true;
      } else {
        alert('error fetching user info. Please try again');
        this.enableAddButton = false;
      }
    });
  }

  addUser() {
    console.log("Emitting: " + this.anUser);
    this.selectedUser.emit(this.anUser);
    $('#userSearchModal').modal('toggle');

    // $('#userSearchModal').on('hidden.bs.modal', function () {
    //   $(this).removeData('bs.modal');
    //   $(this).empty();
    //   $(this).removeAttr('style');
    // })
  }

}
