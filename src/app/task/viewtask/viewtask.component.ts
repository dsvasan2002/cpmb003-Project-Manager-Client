import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import { TaskClass, ITask } from 'src/app/model/task.model';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { consoleSandbox } from '@sentry/utils';
import { Router } from '@angular/router';
import { ProjectClass } from 'src/app/model/project.model';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})

export class ViewtaskComponent implements OnInit {
  errorBlock: boolean;
  errorText: any;
  public tasksList: TaskClass[];
  public filteredTasksList: TaskClass[];
  private _searchByTaskName: string;
  aProject: ProjectClass;

  constructor(
    private _taskService: TaskService,
    private _router: Router) { 
  }   

  ngOnInit() {
    this.getTasksList();
  }

  private getTasksList( ) {
    this._taskService.getAllTasks().subscribe((res) => {
        console.log(res['data']);
        //api response struct is {success: true or false, data: tasks}
        if (res['success']) {
          this.tasksList = res['data'];
          this.filteredTasksList = res['data'];
        } else {
           //Log the info to the log handler
        }
      }, (error: any) => {
        this.errorBlock = true;
        this.errorText = error['message'];
      }
    )
  } 

  // updateSelectedTask(aTask: ITask) {
  //   console.log("updateSelectedTask Function");
  //   this._router.navigate(['/updateTask', aTask]);
  // }

  finishTask (aTask: TaskClass) {
    console.log("In finishTask");
    aTask.hasFinished = true;
    console.log(aTask);
    this._taskService.updateTask(aTask).subscribe(
      (response: any) => {
        this.filterTaskByProjectId(this.aProject.projectId);
      }, (error: any) => {
        this.errorBlock = true;
        this.errorText = error['message'];
      }
    )
  }

  //Method called by event emitted from project search modal
  selectedProject(aProject: ProjectClass) {
    this.aProject = aProject;
    this.filterTaskByProjectId(this.aProject.projectId);
  }

  filterTaskByProjectId(projectId: number) {
    throw new Error("Method not implemented.");
  }
  

}
