import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdduserComponent } from './adduser.component';
import { UserService } from '../../service/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { UserClass } from 'src/app/model/user.model';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';


describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;
  let userService: UserService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
      providers: [FormBuilder, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check getAllUsers call', () => {
    const usersList: UserClass[] = [
      {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
      {userId: 2, firstName: 'FirstName2', lastName: 'LastName2', employeeId: '222', projectId: '1', taskId: ['1']}
    ]

    const spy = spyOn(userService, 'getAllUsers').and.returnValue(
      of({success: true, data: usersList} )
    );

    component.getAllUsers();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.usersList[0].firstName).toEqual('FirstName1');
  });

  it('check getAllUsers call handles error', () => {
    const usersList: UserClass[] = [
      {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
      {userId: 2, firstName: 'FirstName2', lastName: 'LastName2', employeeId: '222', projectId: '1', taskId: ['1']}
    ]

    const spy = spyOn(userService, 'getAllUsers').and.returnValue(
      of({success: false} )
    );

    component.getAllUsers();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.errorBlock).toEqual(false); 
  });

  it('check ngOnInit call', () => {
    const usersList: UserClass[] = [
      {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
      {userId: 2, firstName: 'FirstName2', lastName: 'LastName2', employeeId: '222', projectId: '1', taskId: ['1']}
    ]

    const spy = spyOn(userService, 'getAllUsers').and.returnValue(
      of({success: true, data: usersList} )
    );

    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });


  it('call addNewUser when a new User is added', () => {
    const spy = spyOn(userService, 'addNewUser').and.returnValue(
      of({success: true} )
    );
    
    component._AddUpdateButton = 'Add';
    component.isEditMode = false;
    component.addOrUpdateUser();
    expect(spy).toHaveBeenCalled();

  });
  
  it('check addNewUser handles error', () => {
    const spy = spyOn(userService, 'addNewUser').and.returnValue(
      of({success: false} )
    );
    
    component._AddUpdateButton = 'Add';
    component.isEditMode = false;
    component.addOrUpdateUser();
    expect(component.errorBlock).toBe(false);

  });


  it('call updateUser when a existing User is updated', () => {
    const spy = spyOn(userService, 'updateUser').and.returnValue(
      of({success: true} )
    );
    
    component._AddUpdateButton = 'Update';
    component.isEditMode = true;
    component.addOrUpdateUser();
    expect(spy).toHaveBeenCalled();
  });


  it('deleteUser function should call deleteUser service', () => {
    const spy = spyOn(userService, 'deleteUser').and.returnValue(
      of({success: true} )
    );
    
    component.deleteUser(1);
    expect(spy).toHaveBeenCalled();
  });

  it('deleteUser function should handle error', () => {
    const spy = spyOn(userService, 'deleteUser').and.returnValue(
      of({success: false} )
    );
    component.deleteUser(1);
    expect(spy).toHaveBeenCalled();
  });


  it ('retriveUserList component show user details', () => {

    let anUser = new UserClass();
    anUser.userId = 1;
    anUser.firstName = 'TestnameFirst';
    anUser.lastName = 'TestnameLast';
    anUser.employeeId = '111';
    anUser.projectId = '1';
    anUser.taskId = ['1'];

    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then( ()=> {
      const employeeIdElement: HTMLInputElement = fixture.debugElement.query(By.css('#employeeId')).nativeElement;
      const firstnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#firstName')).nativeElement;
      const lastnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#lastName')).nativeElement;
      component.usersList[0] = anUser;
      
      expect(employeeIdElement.value).toContain(anUser.employeeId);
      expect(firstnameelement.value).toContain(anUser.firstName);
      expect(lastnameelement.value).toContain(anUser.lastName);
    })
  });


  it('call resetUserAddUpdateForm',() => {
    component.resetUserAddUpdateForm();
    expect (component.isEditMode).toBe(false);
    expect (component._AddUpdateButton).toBe('Add');
  });

  it('call resetPage',() => {
    
    const usersList: UserClass[] = [
      {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
      {userId: 2, firstName: 'FirstName2', lastName: 'LastName2', employeeId: '222', projectId: '1', taskId: ['1']}
    ]

    component.anUser = usersList[0];
    component.resetPage();
    fixture.detectChanges();

    expect (component.anUser.firstName).toBe(null);
  });


  it('call initMainForm',() => {
    component.initMainForm();
    expect (component.isEditMode).toBe(false);
    expect (component._AddUpdateButton).toBe('Add');
  })

  it ('filterUserByName should filter as expected', () => {
    const anUserList: UserClass[] = 
    [{userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
    {userId: 2, firstName: 'TestFilter', lastName: 'TestFilter', employeeId: '123', projectId: '1', taskId: ['1']}];
 
    component.usersList = anUserList;
    const anFileteredList: UserClass[] = component.filterUserByName("Test");
    fixture.detectChanges();
    expect(anFileteredList.length).toBe(1);

    component.searchUserString = "Test";
    expect(component._searchUserString).toBe("Test");

    component.editUser(anUserList[0]);
    expect(component.isEditMode).toBe(true);
    expect(component._AddUpdateButton).toBe("Update");

  });

});
