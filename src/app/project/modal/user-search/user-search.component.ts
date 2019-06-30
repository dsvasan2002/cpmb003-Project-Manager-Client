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
  errorBlock: boolean;
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
      }
    }, (error: any) => {
      this.errorBlock = true;
      this.errorText = error['message'];
    })
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

  selectUser(anUserId:number) {
    this._userService.getAnUser(anUserId).subscribe((res: any)=>{
      if (res['success']) {
        this.anUser = res['data'];
        this.enableAddButton = true;
      }
    });
  }

  addUser() {
    this.selectedUser.emit(this.anUser);
    $('#userSearchModal').modal('toggle');
  }

}
