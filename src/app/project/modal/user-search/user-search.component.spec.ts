import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComponent } from './user-search.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { UserClass } from 'src/app/model/user.model';
import { of } from 'rxjs';
// import {Child} from 

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
      providers: [FormBuilder, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('check ngOnInit calls getAllUsers', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
 
    const spy = spyOn(userService, 'getAllUsers').and.returnValue(of({sucess: true, data: anUser}));

    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  
  it ('check getAllUsers call', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
 
    const spy = spyOn(userService, 'getAllUsers').and.returnValue(of({sucess: true, data: anUser}));

    component.getAllUsers();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    
  });


  it ('check getAllUsers hanldes error', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
 
    const spy = spyOn(userService, 'getAllUsers').and.returnValue(of({sucess: false}));

    component.getAllUsers();
    fixture.detectChanges();
    expect(component.errorBlock).toBe(true);
  });

  it ('selectUser should fetch the user information', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
 
    component.anUser.userId = anUser.userId;
    const spy = spyOn(userService, 'getAnUser').and.returnValue(of({sucess: true, data: anUser}));

    component.selectUser(anUser.userId);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(anUser.userId);
    expect(component.anUser.userId).toEqual(anUser.userId);
  });

  it ('selectUser should hanlde error', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
 
    component.anUser.userId = anUser.userId;
    const spy = spyOn(userService, 'getAnUser').and.returnValue(of({sucess: false}));

    component.selectUser(anUser.userId);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(anUser.userId);
    expect(component.errorBlock).toBe(true);
  });

  it ('filterUserByName should filter as expected', () => {
    const anUserList: UserClass[] = 
    [{userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
    {userId: 2, firstName: 'TestFilter', lastName: 'TestFilter', employeeId: '123', projectId: '1', taskId: ['1']}];
 
    component.usersList = anUserList;
    const anFileteredList: UserClass[] = component.filterUserByName("Test");
    fixture.detectChanges();
    expect(anFileteredList.length).toBe(1);
  });


  it ('filterUserByName should be called when search string is set ', () => {
    const anUserList: UserClass[] = 
    [{userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
    {userId: 2, firstName: 'TestFilter', lastName: 'TestFilter', employeeId: '123', projectId: '1', taskId: ['1']}];
 
    component.usersList = anUserList;
    component.searchUserString="Test"; 
    fixture.detectChanges();
    expect(component.filteredUserList.length).toBe(1);
    expect(component.searchUserString).toBe("Test"); 
  });

  it ('Should emit the selected user ', () => {
    const anUserList: UserClass[] = 
    [{userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
    {userId: 2, firstName: 'TestFilter', lastName: 'TestFilter', employeeId: '123', projectId: '1', taskId: ['1']}];
 
    component.usersList = anUserList;
    component.anUser = anUserList[0];
    component.selectedUser.subscribe(x=>{
      expect(x).toEqual(component.anUser)
    });
  });

});
