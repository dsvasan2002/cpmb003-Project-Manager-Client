import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskClass, ITask } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  SERVICE_URL: string = " ";

  constructor(private _http: HttpClient) {
    let _util = new UtilService();
    this.SERVICE_URL=(`${_util.ROOT_URL}`+ "/tasks");
       
  }

  addNewTask(aTask: TaskClass) {
    return this._http.post(`${this.SERVICE_URL}`, aTask);
  }

  getAllTasks(): Observable<any>  {
    return this._http.get<TaskClass[]>(`${this.SERVICE_URL}`);
  }

  getATask(aTaskId: number): Observable<any>  {
    return this._http.get<TaskClass>(`${this.SERVICE_URL}` + '/' + aTaskId);
  }
  
  updateATask(aTask: TaskClass) {
    return this._http.post(`${this.SERVICE_URL}` + '/update', aTask);
  }

  deleteATask(aTaskId: number): Observable<TaskClass>  {
    return this._http.delete<TaskClass>(`${this.SERVICE_URL}` +'/'+aTaskId);
  }
}
