import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSearchComponent } from './project-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectClass } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project.service';
import * as moment from 'moment';
import { of } from 'rxjs';

describe('ProjectSearchComponent', () => {
  let component: ProjectSearchComponent;
  let fixture: ComponentFixture<ProjectSearchComponent>;
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchComponent);
    projectService = TestBed.get(ProjectService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check getAllProjects call', () => {

    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    const spy = spyOn(projectService, 'getAllProjects').and.returnValue(of({success: true, data: aProject}));
    
    component.getAllProjects();
    expect(spy).toHaveBeenCalled();

  });


  it('check getAllProjects call handles error', () => {

    const spy = spyOn(projectService, 'getAllProjects').and.returnValue(of({success: false}));
    
    component.getAllProjects();
    expect(component.errorBlock).toBe(false);

  });

  it('call selectProject', () => {

    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1};

    const spyService = spyOn(projectService, 'getAProject').and.returnValue(of({success: true, data: aProject}));
    component.selectProject(aProject.projectId);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledWith(aProject.projectId);
    expect(component.aProject.projectId).toBe(aProject.projectId);
    expect(component.enableAddButton).toBe(true);
  });

  it('call selectProject handles error', () => {

    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1};

    const spyService = spyOn(projectService, 'getAProject').and.returnValue(of({success: false}));
    component.selectProject(aProject.projectId);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledWith(aProject.projectId);
    expect(component.enableAddButton).toBe(false);
  });


  it('filterProjectsByName should be called by setting searchstring filter as exptected', () => {

    var startDate = new Date();
    var endDate = new Date();
    const aProjectList: ProjectClass[] = [{projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
                    {projectId: 2, projectName  : 'TestFilter', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1}];


    component.projectsList = aProjectList;
    component.searchProjectString = "Test";

    fixture.detectChanges();
    expect(component.searchProjectString).toBe("Test");
    expect(component.filteredProjectsList.length).toBe(1);
  });


  it ('selectedProject should emit the selected project ', () => {
    var startDate = new Date();
    var endDate = new Date();
    const aProjectList: ProjectClass[] = [{projectId: 1, projectName  : 'Project1', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
                    {projectId: 2, projectName  : 'TestFilter', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1}];
 
    component.projectsList = aProjectList;
    component.aProject = aProjectList[0];
    component.selectedProject.subscribe(x=>{
      expect(x).toEqual(component.aProject)
    });

  });

});
