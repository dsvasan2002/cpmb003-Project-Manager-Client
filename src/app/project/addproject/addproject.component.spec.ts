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
  let userService: UserService;

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
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initMainForm should set default values', () => {
    component.initMainForm();
    expect(component.isEditMode).toBe(false);
    expect(component._AddUpdateButton).toBe("Add");
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

    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    const spy = spyOn(projectService, 'getAllProjects').and.returnValue(of({success: false}));
    
    component.getAllProjects();
    fixture.detectChanges();
    expect(component.errorBlock).toBe(false);

  });

  it('call addNewProject when a new Project is added', () => {
    var startDate = new Date();
    var endDate = new Date();
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    const spy = spyOn(projectService, 'addNewProject').and.returnValue(of({success: true}));

    component._AddUpdateButton = 'Add';
    component.isEditMode = false;
    component.projectManager = anUser;
    component.setProjectDates = true;
    component.aProject = aProject;
    component.addOrUpdateProjectButton();
    expect(spy).toHaveBeenCalled();

  });

  it('call updateProject when a Project is updated', () => {
    const spy = spyOn(projectService, 'updateProject').and.returnValue(of({success: true}));

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

  it ('check call to resetMainFormGroup', () => {
    component.resetMainFormGroup();
    expect(component._AddUpdateButton).toContain('Add');
    expect(component.isEditMode).toBe(false);
  });
 
  it('check handleSuspendButton calls deleteProject', ()=>{

    var startDate = new Date();
    var endDate = new Date();
    const aProject: ProjectClass = {projectId: 1, projectName  : 'Project1', priority : 10, startDate: moment(startDate.getDate()).add(-1, 'months').toDate(), endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(), managerId: 1};
    const spyDelete = spyOn(projectService, 'deleteProject').and.returnValue(of({success:true}));
    // const spyProject = spyOn(projectService, 'getAllProjects').and.returnValue(of({success:true, data: aProject}));

    component.handleSuspendButton(aProject.projectId);
    expect(spyDelete).toHaveBeenCalledWith(aProject.projectId);
    // expect(spyProject).toHaveBeenCalled();
  });


  it('call selectedProjectManager', () => {
    const anUser: UserClass = {userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']};
  
   component.selectedProjectManager(anUser);
   fixture.detectChanges();
   expect (component.mainFormGroup.controls["projectManager"].value).toContain('FirstName1');
   expect (component.mainFormGroup.controls["projectManager"].value).toContain('LastName1');
  });


  it ('check calling dateValidation without set project dates', () => {
    component.mainFormGroup.controls['setProjectDates'].setValue(false);
    fixture.detectChanges();
    component.dateValidation();
    expect(component.mainFormGroup.controls["startDate"].value=="")
    expect(component.mainFormGroup.controls["endDate"].value=="")
    expect(component.setProjectDates).toEqual(false); 
  });

  it ('check calling dateValidation with set project dates', () => {
    var today = new Date();
    var today30 = new Date();
    var startDate = moment(today.getDate()).add(-1, 'months').toDate();
    var endDate = moment(today30.getDate() + 30).add(-1, 'months').toDate();

    component.mainFormGroup.controls['setProjectDates'].setValue(true);
    fixture.detectChanges();
    component.dateValidation();
    expect(component.mainFormGroup.controls["startDate"].value == startDate)
    expect(component.mainFormGroup.controls["endDate"].value == endDate)
    expect(component.setProjectDates).toEqual(true); 
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

  it('handleEditButton should set the project details in screen', () => {

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
    const anUserList: UserClass[] = 
              [{userId: 1, firstName: 'FirstName1', lastName: 'LastName1', employeeId: '111', projectId: '1', taskId: ['1']},
               {userId: 2, firstName: 'TestFilter', lastName: 'TestFilter', employeeId: '123', projectId: '1', taskId: ['1']}];
    const spy = spyOn(userService, 'getAnUser').and.returnValue(of({success: true, date: anUserList[0]}));

    component.handleEditButton(aProjectList[0]);
    fixture.detectChanges();
    expect(component.isEditMode).toBe(true);
    expect(spy).toHaveBeenCalled();
  });

  it('sortProjectsList should sort as expected', () => {

    var startDate = new Date();
    var endDate = new Date();
    const aProjectList: ProjectClass[] = [{projectId: 1, projectName  : 'TestFilter', priority : 10,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1},
                    {projectId: 2, projectName  : 'Project1', priority : 1,
                    startDate: moment(startDate.getDate()).add(-1, 'months').toDate(),
                    endDate  : moment(endDate.getDate() + 30).add(-1, 'months').toDate(),
                    managerId: 1}];
                    
    component.filteredProjectsList = aProjectList;
    component.sortProjectsList('priority');

    fixture.detectChanges();
    expect(component.filteredProjectsList[0].projectName).toBe("Project1");
  });


});
