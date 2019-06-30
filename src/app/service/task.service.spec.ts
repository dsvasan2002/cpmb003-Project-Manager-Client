import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskClass } from '../model/task.model';
import * as moment from 'moment';
import { of } from 'rxjs';

describe('TaskService', () => {

  let taskservice: TaskService;
  let taskpostservice: TaskService;
  let httpGetSpy: {
    get: jasmine.Spy
  };
  let httpPostSpy: {
    post: jasmine.Spy
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [TaskService]
  }));

  beforeEach(() => {
    httpGetSpy = jasmine.createSpyObj('Value', ['get']);
    httpPostSpy = jasmine.createSpyObj('Value', ['post']);
  
    taskservice = new TaskService(<any>httpGetSpy);
    taskpostservice = new TaskService(<any>httpPostSpy);
  });

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it ('should return expected Tasks', () => {

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

    httpGetSpy.get.and.returnValue(of(tasksList));
    taskservice.getAllTasks().subscribe(
      data => {expect(tasksList.length).toEqual(2)}
    )

  });

  it ('should return expected task by id', () => {

    var startDate = new Date();
    var endDate = new Date();

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

    httpGetSpy.get.and.returnValue(of(aTask));
    taskservice.getATask(aTask.taskId).subscribe(
      data => {expect(aTask.taskName).toContain('TestTask2')}
    )
  });

  it ('should add a new task', () => {

    var startDate = new Date();
    var endDate = new Date();

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

    httpPostSpy.post.and.returnValue(of(aTask));
    taskpostservice.addNewTask(aTask).subscribe(
      data => {expect(aTask.user.firstName).toEqual('FirstName')}
    )
  });

  it ('should add a new task', () => {

    var startDate = new Date();
    var endDate = new Date();

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
      user       : {userId: 1, firstName: 'UpdatedFirstName', lastName: 'LastName', employeeId: '12345', projectId: '1', taskId: ['1']},
      hasFinished: false
    };

    httpPostSpy.post.and.returnValue(of(aTask));
    taskpostservice.updateATask(aTask).subscribe(
      data => {expect(aTask.user.firstName).toEqual('UpdatedFirstName')}
    )
  });

});
