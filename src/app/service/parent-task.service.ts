import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { ParentTaskClass } from '../model/parent-task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentTaskService {
  SERVICE_URL: string = " ";

  constructor(private _http: HttpClient) {
    let _util = new UtilService();
    this.SERVICE_URL=(`${_util.ROOT_URL}`+"/parenttasks");
  }

  addNewParentTask(aParentTask: ParentTaskClass) {
    return this._http.post(`${this.SERVICE_URL}`, aParentTask);
  }

  getAllParentTasks(): Observable<any>  {
    return this._http.get<ParentTaskClass[]>(`${this.SERVICE_URL}`);
  }

  getAParentTask(aParentTaskId: number): Observable<any>  {
    return this._http.get<ParentTaskClass>(`${this.SERVICE_URL}` + '/' + aParentTaskId);
  }

  getAParentTaskById(anId: string): Observable<ParentTaskClass> {
    return this._http.get<ParentTaskClass>(`${this.SERVICE_URL}` + '/id/' + anId);
  }

  updateParentTask(aParentTask: ParentTaskClass) {
    return this._http.put(`${this.SERVICE_URL}` +'/'+aParentTask.parentTaskId, aParentTask);
  }
}
