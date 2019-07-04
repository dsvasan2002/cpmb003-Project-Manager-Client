import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import { TaskClass, ITask } from 'src/app/model/task.model';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { consoleSandbox } from '@sentry/utils';
import { Router } from '@angular/router';
import { ProjectClass } from 'src/app/model/project.model';
import { ParentTaskService } from 'src/app/service/parent-task.service';
import { ProjectService } from 'src/app/service/project.service';
import { ParentTaskClass } from 'src/app/model/parent-task.model';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})

export class ViewtaskComponent implements OnInit {
  errorBlock: boolean = false;
  errorText: any;
  public tasksList: TaskClass[];
  public filteredTasksList: TaskClass[];
  private _searchByTaskName: string;
  aProject: ProjectClass;
  isDesc: boolean;

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _parentTaskService: ParentTaskService,
    private _projectService: ProjectService) { 
      this.aProject = new ProjectClass();
      // this.tasksList[] = new TaskClass();
  }   

  ngOnInit() {
    this.getTasksList();
  }

  public getTasksList( ) {
    this._taskService.getAllTasks().subscribe((res) => {
        //api response struct is {success: true or false, data: tasks}
        if (res['success']) {
          this.tasksList = res['data'];
          this.filteredTasksList = res['data'];
        } else {
           //Log the info to the log handler
           this.errorBlock = false;
        }
      }, (error: any) => {
        this.errorBlock = true;
        this.errorText = error['message'];
      }
    )
  } 

  //Call the add task page with update option
  updateSelectedTask(aTask: TaskClass) {
    this._router.navigate(['/addTask'], { queryParams: { taskId: aTask.taskId } });
  }

  finishTask (aTask: TaskClass) {
    aTask.hasFinished = true;
    this._taskService.updateATask(aTask).subscribe(
      (response: any) => {
        if (response['success']) {
          alert('Updated the task as complete');
        } else {
          this.errorBlock = true;
          this.errorText = response['message'];
          alert(this.errorText);
        }
      }, (error: any) => {
        this.errorBlock = true;
        this.errorText = error['message'];
        alert(this.errorText);
      }
    );
  }

  //Method called by event emitted from project search modal
  selectedProject(aProject: ProjectClass) {
    this.aProject = aProject;
    this.filteredTasksList = this.filterTaskByProjectId(this.aProject.projectId);
  }

  filterTaskByProjectId(projectId: number): TaskClass[] {
    return this.tasksList.filter(task=>
      task.project.projectId == projectId);
  }
  

  //Sort Tasks List based on user choice
  sortTasksList(sortStr: string) {
    this.isDesc = !this.isDesc; //change the direction    
    let direction = this.isDesc ? 1 : -1;

    this.filteredTasksList = this.filteredTasksList.sort(function(a, b){
      if (a[sortStr] < b[sortStr]){
          return -1 * direction;
      } else if( a[sortStr] > b[sortStr]){
          return 1 * direction;
      } else {
          return 0;
      }
    });
  }
  

}
