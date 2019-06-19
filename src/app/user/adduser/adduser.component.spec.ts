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
// import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';


describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;
  let service: UserService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule ],
      providers: [FormBuilder, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call addNewUser when a new User is added', () => {
    const spy = spyOn(service, 'addNewUser').and.returnValue(
      of({success: true} )
    );
    
    component._AddUpdateButton = 'Add';
    component.addOrUpdateUser();
    expect(spy).toHaveBeenCalled();

  });

  it('call updateUser when a existing User is updated', () => {
    const spy = spyOn(service, 'updateUser').and.returnValue(
      of({success: true} )
    );
    
    component._AddUpdateButton = 'Update';
    component.addOrUpdateUser();
    expect(spy).toHaveBeenCalled();
  });


  it ('retriveUserList component show user details', () => {
    // const anUser = [{
    //   userId: 1,
    //   firstName: 'TestnameFirst',
    //   lastName: 'TestnameLast',
    //   employeeId: 111,
    //   projectId: 1,
    //   taskId: 1
    // }];


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
      const idelement: HTMLInputElement = fixture.debugElement.query(By.css('#employeeId')).nativeElement;
      const firstnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#firstName')).nativeElement;
      const lastnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#lastName')).nativeElement;
      component.usersList[0] = anUser;
      
      expect(firstnameelement.value).toContain(anUser.firstName);
      expect(lastnameelement.value).toContain(anUser.lastName);
    })
  })

});
