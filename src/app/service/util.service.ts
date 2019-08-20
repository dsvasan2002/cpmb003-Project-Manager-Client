import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  readonly ROOT_URL: string = "http://localhost:3000/api";

  constructor() { }
}
