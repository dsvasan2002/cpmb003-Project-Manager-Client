import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { IProject, ProjectClass } from '../model/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  SERVICE_URL: string = " ";

  constructor(private _http: HttpClient) {
    let _util = new UtilService();
    this.SERVICE_URL=(`${_util.ROOT_URL}`+"/projects");
       
  }

  addNewProject(aProject: ProjectClass) {
    return this._http.post(`${this.SERVICE_URL}`, aProject);
  }

  getAllProjects(): Observable<any>  {
    return this._http.get<ProjectClass[]>(`${this.SERVICE_URL}`);
  }

  getAProject(aProjectId: number): Observable<any>  {
    return this._http.get<ProjectClass>(`${this.SERVICE_URL}` + '/' + aProjectId);
  }

  updateProject(aProject: ProjectClass) {
    return this._http.post(`${this.SERVICE_URL}` + '/update', aProject);
  }

  deleteProject(aProjectId: number) {
    return this._http.delete(`${this.SERVICE_URL}` + '/' + aProjectId);
  }
}
