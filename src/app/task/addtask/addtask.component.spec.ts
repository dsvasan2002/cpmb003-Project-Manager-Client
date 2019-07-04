import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskComponent } from './addtask.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/service/task.service';
import { ProjectSearchComponent } from './modal/project-search/project-search.component';
import { TaskSearchComponent } from './modal/task-search/task-search.component';
import { UserSearchComponent } from 'src/app/project/modal/user-search/user-search.component';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from 'src/app/user/adduser/adduser.component';
import { AddprojectComponent } from 'src/app/project/addproject/addproject.component';
import { ViewtaskComponent } from '../viewtask/viewtask.component';
import { of } from 'rxjs';
import { UserClass } from 'src/app/model/user.model';
import { ProjectClass } from 'src/app/model/project.model';
import * as moment from 'moment';
import { TaskClass } from 'src/app/model/task.model';
import { ParentTaskService } from 'src/app/service/parent-task.service';
import { ParentTaskClass } from 'src/app/model/parent-task.model';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;
  let taskservice: TaskService;
  let ptaskservice: ParentTaskService;

  const routes: Routes = [
    { path: 'addUser', component: AdduserComponent },
    { path: 'addProject', component: AddprojectComponent },
    { path: 'addTask', component: AddtaskComponent },
    { path: 'viewTask', component: ViewtaskComponent },
    { path: '', redirectTo: '/viewTask',  pathMatch: 'full' },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskComponent, ProjectSearchComponent, TaskSearchComponent, UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot(), RouterModule.forRoot([]) ],
      providers: [FormBuilder, TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    taskservice = TestBed.get(TaskService);
    ptaskservice = TestBed.get(ParentTaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call addNewTask when a new Task is added', () => {
    var startDate = new Date();
    var endDate = new Date();
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    const spyAdd = spyOn(taskservice, 'addNewTask').and.returnValue(of({success: true}));

    const aTask: TaskClass = {
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TestTask2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    };

    component._AddUpdateButton = 'Add';
    component.isEditMode = false;
    component.aTask = aTask;
    component.aProject = aProject;
    component.addOrUpdateTaskButton();
    expect(spyAdd).toHaveBeenCalled();

  });

  it('call addNewTask handles error', () => {
    var startDate = new Date();
    var endDate = new Date();
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    const spyAdd = spyOn(taskservice, 'addNewTask').and.returnValue(of({success: false}));

    const aTask: TaskClass = {
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TestTask2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    };

    component.addNewTask(aTask);
    expect(spyAdd).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.errorBlock).toBe(false);

  });


  it('call updateATask when a Task is updated', () => {
    var startDate = new Date();
    var endDate = new Date();
    const spyUpd = spyOn(taskservice, 'updateATask').and.returnValue(of({success: true}));

    const aTask: TaskClass = {
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TestTask2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    };

    component._AddUpdateButton = 'Update';
    component.isEditMode = true;
    // component.aProject = aTask.project;
    component.addOrUpdateTaskButton();
    expect(spyUpd).toHaveBeenCalled();
    

  });


  it('check updateATask hanldes error', () => {
    var startDate = new Date();
    var endDate = new Date();
    const spyUpd = spyOn(taskservice, 'updateATask').and.returnValue(of({success: false}));

    const aTask: TaskClass = {
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TestTask2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    };

    component.updateTask(aTask);
    fixture.detectChanges();
    expect(component.errorBlock).toBe(true);
    
  });

  it('call addParentTask when a Paret task is added', () => {
    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    const spyAdd = spyOn(ptaskservice, 'addNewParentTask').and.returnValue(of({success: true}));

    const aTask: TaskClass = {
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TestTask2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    };

    component.mainFormGroup.controls['isParentTask'].setValue(true);
    component._AddUpdateButton = 'Add';
    component.isEditMode = false;
    component.aProject = aProject;
    component.addOrUpdateTaskButton();
    expect(spyAdd).toHaveBeenCalled();
  });

  it ('call selectedUser', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
    component.selectedUser(anUser);
    expect (component.anUser.firstName).toContain('FirstName1');
  })
  
  it ('call selectedProject', () => {
    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'ProjectName1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    
    component.selectedProject(aProject);
    expect (component.aProject.projectName).toBe('ProjectName1');
  })
  
  it('call selectedParentTask', () => {
    const aParentTask: ParentTaskClass = {parentTaskId: 1, parentTaskName: 'UpdatedParentTaskName1', projectId: 1};
    component.selectedParentTask(aParentTask);
    expect (component.aParentTask.parentTaskName).toContain('UpdatedParentTaskName1');
  });

});
