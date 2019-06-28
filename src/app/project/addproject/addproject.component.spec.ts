import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddprojectComponent } from './addproject.component';
import { ProjectService } from 'src/app/service/project.service';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/service/user.service';
import { of } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from 'src/app/project/modal/user-search/user-search.component';
import { ProjectSearchComponent } from 'src/app/task/addtask/modal/project-search/project-search.component';
import { TaskSearchComponent } from 'src/app/task/addtask/modal/task-search/task-search.component';
import { UserClass } from 'src/app/model/user.model';
import { ProjectClass } from 'src/app/model/project.model';
import * as moment from 'moment';

describe('AddprojectComponent', () => {
  let component: AddprojectComponent;
  let fixture: ComponentFixture<AddprojectComponent>;
  let projectService: ProjectService;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprojectComponent, TaskSearchComponent, ProjectSearchComponent, UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
      providers: [FormBuilder, UserService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectComponent);
    projectService = TestBed.get(ProjectService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call addNewProject when a new Project is added', () => {
    const spy = spyOn(projectService, 'addNewProject').and.returnValue(of({success: true}));

    var startDate = new Date();
    var endDate = new Date();

    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};


    component._AddUpdateButton = 'Add';
    component.isEditMode = false;
    component.projectManager = anUser;
    component.setProjectDates = true;
    component.aProject = aProject;
    component.addOrUpdateProjectButton();
    expect(spy).toHaveBeenCalled();

  });

  it('call updateProject when a Project is updated', () => {
    const spy = spyOn(projectService, 'updateProject').and.returnValue(
      of({success: true} )
    );

    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};

    const anUser: UserClass = {userId: 1, firstName: 'UpdatedFirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
    
    component._AddUpdateButton = 'Update';
    component.isEditMode = true;
    component.projectManager = anUser;
    component.setProjectDates = true;
    component.aProject = aProject;
    component.addOrUpdateProjectButton();
    expect(spy).toHaveBeenCalled();

  });



});
