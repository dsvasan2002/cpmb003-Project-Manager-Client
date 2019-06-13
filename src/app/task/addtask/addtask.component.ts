import { Component, OnInit, ErrorHandler } from '@angular/core';
import { TaskClass } from '../../model/task.model';
import { HttpInterceptorService } from 'src/app/service/http-interceptor.service';
// import { SentryErrorHandler } from 'src/app/app.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskService } from 'src/app/service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ProjectClass } from 'src/app/model/project.model';
import { ParentTaskClass } from 'src/app/model/parent-task.model';
import { UserClass } from 'src/app/model/user.model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    // {provide: ErrorHandler, useClass: SentryErrorHandler},
    TaskClass
  ]
})
export class AddtaskComponent implements OnInit {

  public aTask: TaskClass;
  errorBlock: boolean;
  errorText: any;
  mainFormGroup: FormGroup;
  isEditMode: boolean;
  _AddUpdateButton: string;
  projectId: number;
  aProject: ProjectClass;
  aParentTask: ParentTaskClass;
  anUser: any;

  constructor(private _taskService: TaskService, private _formBuilder: FormBuilder) {
    this.aTask = new TaskClass();
    this.initMainForm();
   }

  ngOnInit() {
  }

  // Initialize the form to collect details
  initMainForm(){
    this.mainFormGroup = this._formBuilder.group({
      projectName: ['', Validators.required],
      taskName: ['', Validators.required],
      isParentTask: false,
      priority: ['', Validators.required],
      parentTaskName: '', 
      startDate: [' ', Validators.required],
      endDate: ['', Validators.required],
      userName: ' '
    });
    this.isEditMode = false;
    this._AddUpdateButton = "Add";
  }


  // Load project Form based on Users choice
  addOrUpdateTaskButton() {
    this.aTask.taskName = this.mainFormGroup.controls['taskName'].value;
    this.aTask.projectId = this.projectId;
    if (this.mainFormGroup.controls['isParentTask'].value) {
      //Add or update the parent task table
    } 
    this.aTask.startDate = moment(this.mainFormGroup.controls['startDate'].value).add(-1, 'months').toDate();
    this.aTask.endDate = moment(this.mainFormGroup.controls['endDate'].value).add(-1, 'months').toDate();

    if (this.isEditMode) {
      this.aTask.taskId = this.mainFormGroup.controls['taskId'].value;
      this.updateTask(this.aTask);
    } else  {
        this.addNewTask(this.aTask);
    }
  }
  

  addNewTask(aTask: TaskClass) {
    this._taskService.addNewTask(aTask).subscribe((response: any)=>{
        alert('Task added successfully');
        this.errorBlock = false;
      }, error => {
        this.errorBlock = true;
        this.errorText = error['message'];
        alert('Error in adding Task ' + this.errorText);
    });
  }

  updateTask(aTask: TaskClass) {
    this._taskService.updateTask(aTask).subscribe((response: any)=>{
        alert('Task updated successfully');
        this.errorBlock = false;
      }, error => {
        this.errorBlock = true;
        this.errorText = error['message'];
        alert('Error in updating Task ' + this.errorText);
    });
  }

  resetPage() {
    this.aTask.taskName = null;
    this.aTask.priority = 0;
    this.aTask.parentId = null;
    this.aTask.startDate = null;
    this.aTask.endDate = null;
  }


  //Method called by event emitted from project search modal
  selectedProject(aProject: ProjectClass) {
    this.aProject = aProject;
    this.mainFormGroup.get('projectName').setValue(`${this.aProject.projectName}`);
  }
  //Method called by event emitted from parent task search modal
  selectedParentTask(aParentTask: ParentTaskClass) {
    this.aParentTask = aParentTask;
    this.mainFormGroup.get('parentTaskName').setValue(`${this.aParentTask.parentTaskName}`);
  }
  //Method called by event emitted from user search modal
  selectedUser(anUser: UserClass) {
    this.anUser = anUser;
    this.mainFormGroup.get('userName').setValue(`${this.anUser.firstName}`+" "+`${this.anUser.lastName}`);
  }

}
