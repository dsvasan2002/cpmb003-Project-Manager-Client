import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ViewtaskComponent } from './viewtask.component';
import { TaskService } from 'src/app/service/task.service';
import { of } from 'rxjs';
import { TaskClass } from 'src/app/model/task.model';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TaskSearchComponent } from '../addtask/modal/task-search/task-search.component';
import { ProjectSearchComponent } from '../addtask/modal/project-search/project-search.component';
import { UserSearchComponent } from 'src/app/project/modal/user-search/user-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { RouterModule, Router,  } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import * as moment from 'moment';
import { ProjectClass } from 'src/app/model/project.model';
import { componentFactoryName } from '@angular/compiler';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;
  let service: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtaskComponent, TaskSearchComponent, ProjectSearchComponent, UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot(), RouterTestingModule ],
      providers: [FormBuilder, UserService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('call finishTask with task', fakeAsync(() => {
    const spy = spyOn(service, 'updateATask').and.returnValue(of({success: true}));

    var startDate = new Date();
    var endDate = new Date();

    const tasksList: TaskClass[] = [{
      taskId     : 1,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName1',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    },{
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    }];

    component.tasksList =  tasksList;
    component.finishTask(component.tasksList[0]);
    expect (spy).toHaveBeenCalledWith(component.tasksList[0]);
  }));
 
  it ('call finishTask with task', fakeAsync(() => {
    const spy = spyOn(service, 'updateATask').and.returnValue(of({success: false}));

    var startDate = new Date();
    var endDate = new Date();

    const tasksList: TaskClass[] = [{
      taskId     : 1,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName1',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    },{
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    }];

    component.tasksList =  tasksList;
    component.finishTask(component.tasksList[0]);
    fixture.detectChanges();
    expect (component.errorBlock).toBe(true);
  }));
 
  it('check selectedProject call', () => {
    var startDate = new Date();
    var endDate = new Date();
    
    var startDate = new Date();
    var endDate = new Date();

    const tasksList: TaskClass[] = [{
      taskId     : 1,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName1',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    },{
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    }];

    const anproject: ProjectClass = {projectId: 1, projectName  : 'UpdatedProject1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1};

    component.tasksList = tasksList;
    component.selectedProject(anproject);
    fixture.detectChanges();
    expect(component.aProject.projectName).toBe(anproject.projectName);
  });


  

  it('check getTasksList call', () => {
    var startDate = new Date();
    var endDate = new Date();

    const tasksList: TaskClass[] = [{
      taskId     : 1,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName1',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    },{
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName2',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    }];

    const spyService = spyOn(service, 'getAllTasks').and.returnValue(of({success: true, data: tasksList}));
    component.getTasksList();
    fixture.detectChanges();
    
    expect(spyService).toHaveBeenCalled();
  });


  it('check getTasksList call handles error', () => {
    const spyService = spyOn(service, 'getAllTasks').and.returnValue(of({success: false}));
    component.getTasksList();
    fixture.detectChanges();
    expect(component.errorBlock).toBe(false);
  });


  it('filterTaskByProjectId should be called when a Project is set and should filter tasks by project id', () => {
    var startDate = new Date();
    var endDate = new Date();

    const tasksList: TaskClass[] = [{
      taskId     : 1,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TaskName1',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    },{
      taskId     : 2,
      parentTask : {parentTaskId: 1, parentTaskName: 'Parent1', projectId: 1},
      project    : {projectId: 2, projectName  : 'TestFilterProject', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
      taskName   : 'TestFilter',
      startDate  : moment(startDate.getDate()).add(-1, 'months').toDate(),
      endDate    : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
      priority   : 5,    
      user       : {userId: 1, firstName: 'FirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    }];

    
    component.tasksList = tasksList;
    component.aProject = tasksList[1].project;

    component.selectedProject(tasksList[1].project);
    fixture.detectChanges();
    expect(component.aProject.projectName).toBe("TestFilterProject");
    expect(component.filteredTasksList.length).toBe(1);
   
   
  });


});
