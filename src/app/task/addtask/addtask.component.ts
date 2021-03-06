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
import { ParentTaskService } from 'src/app/service/parent-task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    // {provide: ErrorHandler, useClass: SentryErrorHandler},
    TaskClass
  ]
})
export class AddtaskComponent implements OnInit {

  public aTask: TaskClass;
  errorBlock: boolean = false;
  errorText: any;
  mainFormGroup: FormGroup;
  isEditMode: boolean = false;
  _AddUpdateButton: string;
  projectId: number;
  aProject: ProjectClass;
  aParentTask: ParentTaskClass;

  anUser: UserClass;
  aTaskId: number;
  finishedTask: boolean = false;

  constructor(private _taskService: TaskService,
    private _formBuilder: FormBuilder,
    private _parentTaskService: ParentTaskService,
    private _activatedRoute: ActivatedRoute) {
    this.aTask = new TaskClass();
    this.aTask.parentTask = new ParentTaskClass();
    this.aTask.project = new ProjectClass();
    this.aTask.user = new UserClass();
    this.initMainForm();
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.aTaskId = params['taskId'];
    });
    if (this.aTaskId) {
      this.setTaskToUpdate();
    }
  }

  setTaskToUpdate() {
    this._taskService.getATask(this.aTaskId).subscribe((response: any) => {
      if (response['success']) {
        this.aTask = response['data'];
        this.initMainForm();
        this._AddUpdateButton = "Update";
        this.isEditMode = true;
        if (this.aTask.hasFinished) {
          this.finishedTask = true;
          this.mainFormGroup.controls["taskName"].disable({onlySelf: true});
        }
        this.mainFormGroup.controls["taskId"].setValue(this.aTask.taskId);
        this.mainFormGroup.controls["projectName"].setValue(this.aTask.project.projectName);
        this.mainFormGroup.controls["taskName"].setValue(this.aTask.taskName);
        this.mainFormGroup.controls["priority"].setValue(this.aTask.priority);
        if (this.aTask.parentTask) {
          this.mainFormGroup.controls["parentTaskName"].setValue(this.aTask.parentTask.parentTaskName);
        }
        if (this.aTask.startDate) {
          let newStarDate = new Date(this.aTask.startDate);
          let taskStartDate = <NgbDateStruct>{ year: newStarDate.getFullYear(), month: newStarDate.getMonth() + 1, day: newStarDate.getDate() };
          this.mainFormGroup.controls["startDate"].setValue(taskStartDate);
        }
        if (this.aTask.endDate) {
          let newEndDate = new Date(this.aTask.endDate);
          let taskEndDate = <NgbDateStruct>{ year: newEndDate.getFullYear(), month: newEndDate.getMonth() + 1, day: newEndDate.getDate() };
          this.mainFormGroup.controls["endDate"].setValue(taskEndDate);
        }

        if ((this.aTask.user) && (this.aTask.user.userId)) {
          this.mainFormGroup.get('userName').setValue(`${this.aTask.user.firstName}` + " " + `${this.aTask.user.lastName}`);
        }

      } else {
        alert('Error in adding Task ' + response['message']);
      }
    }, error => {
      this.errorBlock = true;
      alert('Error in adding Task ' + error['message']);
    });
  }


  // Initialize the form to collect details
  initMainForm() {
    this.mainFormGroup = this._formBuilder.group({
      taskId: ' ',
      projectName: ['', Validators.required],
      taskName: ['', Validators.required],
      isParentTask: false,
      priority: ['15', Validators.required],
      parentTaskName: '',
      startDate: [' ', Validators.required],
      endDate: ['', Validators.required],
      userName: ' '
    });
    this.isEditMode = false;
    this.finishedTask =  false;
    this._AddUpdateButton = "Add";
  }


  // Load project Form based on Users choice
  addOrUpdateTaskButton() {
    this.aTask.taskName = this.mainFormGroup.controls['taskName'].value;
    this.aTask.startDate = moment(this.mainFormGroup.controls['startDate'].value).add(-1, 'months').toDate();
    this.aTask.endDate = moment(this.mainFormGroup.controls['endDate'].value).add(-1, 'months').toDate();
    this.aTask.priority = this.mainFormGroup.controls['priority'].value;

    // if ((this.aParentTask) && (this.aParentTask.parentTaskId)) {
    if (this.mainFormGroup.controls['parentTaskName'].value) {
        this.aTask.parentTask = this.aParentTask;
    } else {
      this.aTask.parentTask = null;
    }
    // if (this.aProject) {
    if (this.mainFormGroup.controls['projectName'].value) {
        this.aTask.project = this.aProject;
    }
    if (this.mainFormGroup.controls['isParentTask'].value) {
      //Add or update the parent task table
      let aParentTask = new ParentTaskClass();
      aParentTask.parentTaskName = this.mainFormGroup.controls['taskName'].value;
      aParentTask.projectId = this.aProject.projectId;
      this._parentTaskService.addNewParentTask(aParentTask).subscribe((res: any) => {
        if (res['success']) {
          alert('Parent Task Added');
        } else {
          alert('Error in adding Parent Task. ' + res['message']);
        }
      });

    }

    if (this.isEditMode) {
      this.aTask.taskId = this.mainFormGroup.controls['taskId'].value;
      this.updateTask(this.aTask);
    } else {
      this.addNewTask(this.aTask);
    }
  }


  addNewTask(aTask: TaskClass) {
    this._taskService.addNewTask(aTask).subscribe((response: any) => {

      if (response['success']) {
        alert('Task added successfully');
        this.errorBlock = false;
        this.mainFormGroup.reset();

      } else {
        this.errorBlock = true;
        alert('Error in adding Task.' + " " + response['message']);
      }

    }, error => {
      this.errorBlock = true;
      // this.errorText = error['message'];
      alert('Error in adding Task ' +  error['message']);
    });
  }

  updateTask(aTask: TaskClass) {
    this._taskService.updateATask(aTask).subscribe((response: any) => {
      if (response['success']) {
        alert('Task updated successfully');
        this.errorBlock = false;
      } else {
        this.errorBlock = true;
        // this.errorText = response['message'];
        alert('Error in updating Task. ' +  response['message']);
      }
    }, error => {
      this.errorBlock = true;
      // this.errorText = error['message'];
      alert('Error in updating Task ' + error['message']);
    });
  }

  //Method called by event emitted from project search modal
  selectedProject(aProject: ProjectClass) {
    this.aProject = aProject;
    this.mainFormGroup.get('projectName').setValue(`${this.aProject.projectName}`);
    this.mainFormGroup.markAsTouched();
  }
  //Method called by event emitted from parent task search modal
  selectedParentTask(aParentTask: ParentTaskClass) {
    this.aParentTask = aParentTask;
    this.mainFormGroup.get('parentTaskName').setValue(`${this.aParentTask.parentTaskName}`);
    this.mainFormGroup.markAsTouched();
  }
  //Method called by event emitted from user search modal
  selectedUser(anUser: UserClass) {
    this.anUser = anUser;
    this.mainFormGroup.get('userName').setValue(`${this.anUser.firstName}` + " " + `${this.anUser.lastName}`);
    this.mainFormGroup.markAsTouched();
  }

}
