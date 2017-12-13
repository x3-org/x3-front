import { Component, TemplateRef, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { StudentService } from "../../services/student.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public modalRef: BsModalRef;
  public subscriptions: Subscription[] = [];
  public messages: string[] = [];

  //Student表单
  fStudentData: FormGroup;

  //Student 列表
  students: any;

  //添加Student
  studentData: any;

  //编辑 Student
  id: number;
  name: string;
  email: string;
  age: number;

  constructor(
    private modalService: BsModalService,
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.refreshData();

    //添加Student表单
    this.fStudentData = this.formBuilder.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]

    });
  }

  //刷新获取所有Student
  refreshData() {
    this.studentService.getAllStudents()
      .subscribe(data => {
        this.students = data;
        console.log(data);
      });
  }

  //添加Student
  onStudentAdd(studentData: any) {

    this.studentService.postStudent(studentData)
      .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        alert('Something went Wrong');
      }
      );
    this.studentData = studentData;
    console.log(this.studentData);
  }

  //编辑Student
  onStudentEdit(studentData) {
    this.studentData = studentData;
    this.studentData.id = this.id;    
    this.studentService.putStudentById(this.studentData.id, this.studentData)
      .subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
      );
    this.refreshData();      
  }

  //删除Student
  onStudentDeleteById(id: number) {
    this.studentService.deleteStudentById(id)
      .subscribe(
      (res) => console.log(res),
      (error) => alert(error)
      );
  }

  //模态------>

  //弹出添加Student模态窗口
  public addStudentModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  //弹出编辑Student模态窗口
  editStudentModel(template: TemplateRef<any>, studentData: any) {
    this.id = studentData.id;
    this.name = studentData.name;
    this.email = studentData.email;
    this.age = studentData.age;
    console.log(studentData);

    this.subscriptions.push(this.modalService.onHidden.subscribe((reason: string) => {
      this.messages.push(`onHidden event has been fired${reason ? ', dismissed by ' + reason : ''}`);
      console.log(this.messages);
      this.refreshData();      
      this.unsubscribe();
    }));
   
    this.modalRef = this.modalService.show(template);
  }
  
  //模态事件处理
  public unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}
