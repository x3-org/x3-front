import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import {environment} from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class StudentService extends BaseService {

  results: any;

  constructor(private httpa: HttpClient) { 
    super(httpa);
  } 

  getAllStudents(): Observable<any> { 
    return this.get(`${environment.appApi.baseUrl}/students`, "");
  }

  postStudent(registerStudent: Observable<any>): Observable<any> {
    console.log("type:", typeof registerStudent );
    return this.post(`${environment.appApi.baseUrl}/student/`, registerStudent);
  }

  putStudentById(id: any, updateStudent: any): Observable<any> {
    return this.put(`${environment.appApi.baseUrl}/student/`, updateStudent);
  }

  deleteStudentById(id: any): any {
    return this.delete(`${environment.appApi.baseUrl}/delStudent/`, id);
  }

}
