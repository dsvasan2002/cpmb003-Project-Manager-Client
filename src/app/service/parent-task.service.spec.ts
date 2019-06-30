import { TestBed } from '@angular/core/testing';

import { ParentTaskService } from './parent-task.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParentTaskClass } from '../model/parent-task.model';
import { of } from 'rxjs';

describe('ParentTaskService', () => {

  let parentGetService: ParentTaskService;
  let parentPostService: ParentTaskService;
  let parentPutService: ParentTaskService;
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
    providers: [ParentTaskService]
  }));

  beforeEach(() => {
    httpGetSpy = jasmine.createSpyObj('Value', ['get']);
    httpPostSpy = jasmine.createSpyObj('Value', ['post']);
    httpPutSpy = jasmine.createSpyObj('Value', ['put']);
  
    parentGetService = new ParentTaskService(<any>httpGetSpy);
    parentPostService = new ParentTaskService(<any>httpPostSpy);
    parentPutService = new ParentTaskService(<any>httpPutSpy);
  });


  it('should be created', () => {
    const service: ParentTaskService = TestBed.get(ParentTaskService);
    expect(service).toBeTruthy();
  });

  it ('should return expected parentsList', () => {
    const parentsList: ParentTaskClass[] = [
      {parentTaskId: 1, parentTaskName: 'ParentTaskName1', projectId: 1},
      {parentTaskId: 2, parentTaskName: 'ParentTaskName2', projectId: 1}
    ]

    httpGetSpy.get.and.returnValue(of(parentsList));
    parentGetService.getAllParentTasks().subscribe(
      data => {expect(parentsList.length).toEqual(2)}
    )

  });

  it ('should return expected parent by id', () => {
    const aParentTask: ParentTaskClass = {parentTaskId: 1, parentTaskName: 'ParentTaskName1', projectId: 1};
      
    httpGetSpy.get.and.returnValue(of(aParentTask));
    parentGetService.getAParentTask(aParentTask.parentTaskId).subscribe(
      data => {expect(aParentTask.parentTaskName).toEqual('ParentTaskName1')}
    )
  });

  it ('should create an parent ', () => {
    const aParentTask: ParentTaskClass = {parentTaskId: 1, parentTaskName: 'ParentTaskName1', projectId: 1};
      
    httpPostSpy.post.and.returnValue(of(aParentTask));
    parentPostService.addNewParentTask(aParentTask).subscribe(
      data => {expect(aParentTask.parentTaskName).toEqual('ParentTaskName1')}
    )
  });

  it ('should update an parent ', () => {
    const aParentTask: ParentTaskClass = {parentTaskId: 1, parentTaskName: 'UpdatedParentTaskName1', projectId: 1};
      
    httpPutSpy.put.and.returnValue(of(aParentTask));
    parentPutService.updateParentTask(aParentTask).subscribe(
      data => {expect(aParentTask.parentTaskName).toEqual('UpdatedParentTaskName1')}
    )
  });

});
