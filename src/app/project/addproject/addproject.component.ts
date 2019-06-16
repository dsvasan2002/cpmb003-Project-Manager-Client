import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProject, ProjectClass } from 'src/app/model/project.model';
import { getLocaleMonthNames } from '@angular/common';
import * as moment from 'moment';
import { UserClass } from 'src/app/model/user.model';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})

export class AddprojectComponent implements OnInit {
  projectsList: ProjectClass[];
  filteredProjectsList: ProjectClass[];
  aProject: ProjectClass;
  projectManager: UserClass;
  errorBlock: boolean;
  errorText: any;
  userAddUpdFormGroup: FormGroup;
  _AddUpdateButton: string = "Add";
  mainFormGroup: FormGroup;
  isEditMode: boolean;
  setProjectDates: boolean;
  isDesc: boolean;
  private _searchProjectString: string;

  constructor(private _projectService: ProjectService, private _userService: UserService, private _formBuilder: FormBuilder) { 
    this.initMainForm();
    this.projectManager = new UserClass();
    this.aProject = new ProjectClass();

  }

  ngOnInit() {
    this.getAllProjects();
    this.dateValidation();
  }

  public get searchProjectString(): string {
    return this._searchProjectString;
  }
  public set searchProjectString(value: string) {
    this._searchProjectString = value;
    this.filteredProjectsList = this.filterProjectsByName(this._searchProjectString);
  }

  getAllProjects() {
    this._projectService.getAllProjects().subscribe((response: any)=>{
      if (response['success']) {
        console.log(response['data']);
        this.projectsList = response['data'];
        this.filteredProjectsList = response['data'];
        console.log(this.filteredProjectsList);
      } 
    }, (error: any) => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
  }

 // Initialize the form to collect user details
 initMainForm(){
   this.mainFormGroup = this._formBuilder.group({
    projectName: ['', Validators.required],
    setProjectDates: false,
    startDate: [{value: '', disabled: true}, Validators.required],
    endDate: [{value: '', disabled: true}, Validators.required],
    priority: 0,
    projectManager: ' ',
    projectId: ''
  });
  this.isEditMode = false;
  this._AddUpdateButton = "Add";
  }

  filterProjectsByName(searchString: string): ProjectClass[] {
    return this.projectsList.filter(project => 
      project.projectName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  // Load project Form based on Users choice
  addOrUpdateProjectButton() {
    this.aProject.projectName = this.mainFormGroup.controls['projectName'].value;
    this.aProject.priority = this.mainFormGroup.controls['priority'].value;
    if (this.setProjectDates) {
      this.aProject.startDate = moment(this.mainFormGroup.controls['startDate'].value).add(-1, 'months').toDate();
      this.aProject.endDate = moment(this.mainFormGroup.controls['endDate'].value).add(-1, 'months').toDate();
    } 
    if (this.projectManager) {
      this.aProject.managerId = this.projectManager.userId;
    }

    if (this.isEditMode) {
      this.aProject.projectId = this.mainFormGroup.controls['projectId'].value;
      this.updateProject(this.aProject);
    } else  {
        this.addNewProject(this.aProject);
    }
  }
  
  handleSuspendButton(aProjectId: number) {
    this.deleteProject(aProjectId);
  }

  handleEditButton(aProject: ProjectClass) {
    this.isEditMode = true;
    this.mainFormGroup.reset();
    this._AddUpdateButton = "Update";
    if (aProject) {
      this.mainFormGroup.controls["projectName"].setValue(aProject.projectName);
      this.mainFormGroup.controls["projectId"].setValue(aProject.projectId);          
      this.mainFormGroup.controls["priority"].setValue(aProject.priority);
      this.mainFormGroup.controls["projectName"].setValidators(Validators.required);       
      var projStartDate: NgbDateStruct;
      var projEndDate: NgbDateStruct;
      if (aProject.startDate || aProject.endDate) {
        this.mainFormGroup.controls["setProjectDates"].setValue(true);
        let newStarDate = new Date(aProject.startDate)
        let newEndDate  = new Date(aProject.endDate)

        projStartDate = <NgbDateStruct>{ year  : newStarDate.getFullYear(), month : newStarDate.getMonth() + 1,day   : newStarDate.getDate()  };

        projEndDate = <NgbDateStruct>{year  : newEndDate.getFullYear(), month : newEndDate.getMonth() + 1, day   : newEndDate.getDate()};
        this.mainFormGroup.controls["startDate"].setValue(projStartDate);
        this.mainFormGroup.controls["endDate"].setValue(projEndDate);
      } else {
        this.mainFormGroup.controls["setProjectDates"].setValue(false);
      }
      if (aProject.managerId) {
        this._userService.getAnUser(aProject.managerId)
          .subscribe(response => {
            this.projectManager = response['data'];
            if (response['data']) {
              this.mainFormGroup.controls["projectManager"].setValue(`${this.projectManager.firstName} ${this.projectManager.lastName}`);
            }
          });
      }

    }

  }
  
  addNewProject(aProject: ProjectClass) {
    this._projectService.addNewProject(aProject).subscribe((res: any)=>{

      if (res['success']) {
        alert('Add user Successfull');
        this.getAllProjects();
        this.resetMainFormGroup();
      } else {
        alert('Add Project failed' + res['message']);
      }
    }, error => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
  }

  updateProject(aProject: ProjectClass) {
    this._projectService.updateProject(aProject).subscribe((response: any)=>{
      if (response['success']) {
        alert('Update Project Successfull');
        this.initMainForm();
        this.getAllProjects();
      } else {
        alert('Update user failed' + response['message']);
      }
    }, error => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
  }
  

  deleteProject(aProjectId: number) {
    this._projectService.deleteProject(aProjectId).subscribe((response: any)=>{
      if (response['success']) {
        alert('Project Delete successfull');
        this.getAllProjects();
      } else {
        alert(response['message']);
      }
    }, error => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
    
  }

  //Sort user List based on user choice
  sortProjectsList(sortStr: string) {
    this.isDesc = !this.isDesc; //change the direction    
    let direction = this.isDesc ? 1 : -1;

    this.filteredProjectsList = this.filteredProjectsList.sort(function(a, b){
      if (a[sortStr] < b[sortStr]){
          return -1 * direction;
      } else if( a[sortStr] > b[sortStr]){
          return 1 * direction;
      } else {
          return 0;
      }
    });
  }

  resetMainFormGroup() {
    this.mainFormGroup.reset();
    this._AddUpdateButton = "Add";
    this.isEditMode = false;
  }
  


  //Method called by event emitted from user search modal
  selectedProjectManager(anUser: UserClass) {
    this.projectManager = anUser;
    this.mainFormGroup.get('projectManager').setValue(`${this.projectManager.firstName} ${this.projectManager.lastName}`);
  }


  dateValidation() {
    this.mainFormGroup.get('setProjectDates').valueChanges.subscribe(
      (setdate: boolean) => {
        this.setProjectDates = setdate;
         if (setdate) {
           var today = new Date();
           var startDate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
           this.mainFormGroup.get('startDate').setValidators([Validators.required]);
           this.mainFormGroup.get('startDate').setValue(startDate);
           this.mainFormGroup.get('startDate').enable({ emitEvent: true });
           var endDate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };
           this.mainFormGroup.get('endDate').setValidators([Validators.required]);
           this.mainFormGroup.get('endDate').setValue(endDate);
           this.mainFormGroup.get('endDate').enable({ emitEvent: true });
         }
         else {
           this.mainFormGroup.get('startDate').clearValidators();
           this.mainFormGroup.get('startDate').setValue('');
           this.mainFormGroup.get('startDate').disable({ emitEvent: true });
           this.mainFormGroup.get('endDate').clearValidators();
           this.mainFormGroup.get('endDate').setValue('');
           this.mainFormGroup.get('endDate').disable({ emitEvent: true });
         }
     });
 
     this.mainFormGroup.get('endDate').valueChanges.subscribe(
       (endDateSelected: Date) => {
         var startDateSelected = this.mainFormGroup.get('startDate').value;
         var endDate = moment(endDateSelected).add(-1, 'months').toDate();
         var startDate = moment(startDateSelected).add(-1, 'months').toDate();
         if (startDate && endDate) {
           if (endDate < startDate) {
             alert('End date should be greater than start date');
             this.mainFormGroup.controls['endDate'].setErrors({ 'incorrect': true });
           }
         }
     });
 
     this.mainFormGroup.get('startDate').valueChanges.subscribe(
       (startDateSelected: Date) => {
         var endDateSelected = this.mainFormGroup.get('endDate').value;
         var endDate = moment(endDateSelected).add(-1, 'months').toDate();
         var startDate = moment(startDateSelected).add(-1, 'months').toDate();
         if (endDate && startDate) {
           if (startDate > endDate) {
             alert('Start date should be less than end date');            
             this.mainFormGroup.controls['startDate'].setErrors({ 'incorrect': true });
           }
         }
     });
   }

}
