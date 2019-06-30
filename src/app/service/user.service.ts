import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { IUser, UserClass } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVICE_URL: string = " ";

  constructor(private _http: HttpClient) {
    let _util = new UtilService();
    this.SERVICE_URL=(`${_util.ROOT_URL}`+"/users");
       
  }

  addNewUser(anUser: UserClass) {
    return this._http.post(`${this.SERVICE_URL}`, anUser);
  }

  getAllUsers(): Observable<UserClass[]>  {
    return this._http.get<UserClass[]>(`${this.SERVICE_URL}`);
  }
  getAnUser(anUserId: number): Observable<any>  {
    return this._http.get<UserClass>(`${this.SERVICE_URL}` +'/'+anUserId);
  }

  updateUser(anUser: UserClass) {
    return this._http.put(`${this.SERVICE_URL}` +'/'+anUser.userId, anUser);
  }

  deleteUser(anUserId: number): Observable<UserClass> {
    return this._http.delete<UserClass>(`${this.SERVICE_URL}` +'/'+anUserId);
  }
}
