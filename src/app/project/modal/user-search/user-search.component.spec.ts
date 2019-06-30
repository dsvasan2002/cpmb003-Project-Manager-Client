import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComponent } from './user-search.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { UserClass } from 'src/app/model/user.model';
import { of } from 'rxjs';

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

  it ('selectUser should fetch the user information', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};

    // let anUser = new UserClass();

    // anUser.userId = 1;
    // anUser.firstName = 'FirstName1';
    // anUser.lastName = 'LastName1';
    // anUser.employeeId = '111',
    // anUser.projectId = '1';
    // anUser.taskId = ['1'];
    
    component.anUser.userId = anUser.userId;
    const spy = spyOn(userService, 'getAnUser').and.returnValue(of({sucess: true, data: anUser}));

    component.selectUser(anUser.userId);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(anUser.userId);
    // expect (component.enableAddButton).toBe(true);
  });

});
