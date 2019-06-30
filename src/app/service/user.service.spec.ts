import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserClass } from '../model/user.model';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserService', () => {

  let userGetService: UserService;
  let userPostService: UserService;
  let userPutService: UserService;
  let httpGetSpy: {
    get: jasmine.Spy
  };
  let httpPostSpy: {
    post: jasmine.Spy
  };
  let httpPutSpy: {
    put: jasmine.Spy
  };


  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [UserService]
  }));

  beforeEach(() => {
    httpGetSpy = jasmine.createSpyObj('Value', ['get']);
    httpPostSpy = jasmine.createSpyObj('Value', ['post']);
    httpPutSpy = jasmine.createSpyObj('Value', ['put']);
  
    userGetService = new UserService(<any>httpGetSpy);
    userPostService = new UserService(<any>httpPostSpy);
    userPutService = new UserService(<any>httpPutSpy);
  });


  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it ('should return expected usersList', () => {
    const usersList: UserClass[] = [
      {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
      {userId: 2, firstName: 'FirstName2', lastName: 'LastName2', employeeId: '222', projectId: '1', taskId: ['1']}
    ]

    httpGetSpy.get.and.returnValue(of(usersList));
    userGetService.getAllUsers().subscribe(
      data => {expect(usersList.length).toEqual(2)}
    )

  });

  it ('should return expected user by id', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
      
    httpGetSpy.get.and.returnValue(of(anUser));
    userGetService.getAnUser(anUser.userId).subscribe(
      data => {expect(anUser.firstName).toEqual('FirstName1')}
    )
  });

  it ('should create an user ', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
      
    httpPostSpy.post.and.returnValue(of(anUser));
    userPostService.addNewUser(anUser).subscribe(
      data => {expect(anUser.firstName).toEqual('FirstName1')}
    )
  });

  it ('should update an user ', () => {
    const anUser: UserClass = {userId: 1, firstName: 'UpdatedFirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
      
    httpPutSpy.put.and.returnValue(of(anUser));
    userPutService.updateUser(anUser).subscribe(
      data => {expect(anUser.firstName).toEqual('UpdatedFirstName1')}
    )
  });

});
