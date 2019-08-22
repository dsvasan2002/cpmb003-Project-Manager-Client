import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as moment from 'moment';
import { ProjectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectClass } from '../model/project.model';

describe('ProjectService', () => {

  let projectGetService: ProjectService;
  let projectPostService: ProjectService;
  let projectPutService: ProjectService;
  let projectDelService: ProjectService;
  let httpGetSpy: {
    get: jasmine.Spy
  };
  let httpPostSpy: {
    post: jasmine.Spy
  };
  let httpPutSpy: {
    put: jasmine.Spy
  };  
  let httpDelSpy: {
    delete: jasmine.Spy
  };


  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [ProjectService]
  }));

  beforeEach(() => {
    httpGetSpy = jasmine.createSpyObj('Value', ['get']);
    httpPostSpy = jasmine.createSpyObj('Value', ['post']);
    httpPutSpy = jasmine.createSpyObj('Value', ['put']);
    httpDelSpy = jasmine.createSpyObj('Value', ['delete']);
  
    projectGetService = new ProjectService(<any>httpGetSpy);
    projectPostService = new ProjectService(<any>httpPostSpy);
    projectPutService = new ProjectService(<any>httpPutSpy);
    projectDelService = new ProjectService(<any>httpDelSpy);
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it ('should return expected projectsList', () => {
    var startDate = new Date();
    var endDate = new Date();
    const projectsList: ProjectClass[] = [
       {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1}  ,
	   {projectId: 2, projectName  : 'Project2', priority : 11,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1}

    ]

    httpGetSpy.get.and.returnValue(of(projectsList));
    projectGetService.getAllProjects().subscribe(
      data => {expect(projectsList.length).toEqual(2)}
    )

  });

  it ('should return expected project by id', () => {
    var startDate = new Date();
    var endDate = new Date();
    const anproject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1};
      
    httpGetSpy.get.and.returnValue(of(anproject));
    projectGetService.getAProject(anproject.projectId).subscribe(
      data => {expect(anproject.projectName).toEqual('Project1')}
    )
  });

  it ('should create an project ', () => {
    var startDate = new Date();
    var endDate = new Date();
    const anproject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1};
      
    httpPostSpy.post.and.returnValue(of(anproject));
    projectPostService.addNewProject(anproject).subscribe(
      data => {expect(anproject.projectName).toEqual('Project1')}
    )
  });

  it ('should update an project ', () => {
    var startDate = new Date();
    var endDate = new Date();
    const anproject: ProjectClass = {projectId: 1, projectName  : 'UpdatedProject1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1};
      
    httpPostSpy.post.and.returnValue(of(anproject));
    projectPostService.updateProject(anproject).subscribe(
      data => {expect(anproject.projectName).toEqual('UpdatedProject1')}
    )
  });

  it ('should delete an project ', () => {
    var startDate = new Date();
    var endDate = new Date();
    const anproject: ProjectClass = {projectId: 1, projectName  : 'UpdatedProject1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1};
      
    httpDelSpy.delete.and.returnValue(of({success:true}));
    projectDelService.deleteProject(anproject.projectId).subscribe(
      data => {expect(data['success']).toEqual(true)}
    )
  });

});
