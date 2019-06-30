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


});
