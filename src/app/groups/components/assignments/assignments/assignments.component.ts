import {User} from './../../../../core/models/user.model';
import {UserService} from './../../../../core/services/user.service';
import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../../../../core/services/assigntments.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "../../../../core/models/assignment.model";
import {AssignmentModel} from "../../../../core/models/assignmentModel";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  form: FormGroup;
  currentUser: User;
  assignments: Assignment[];
  group_id: number;
  student_id: number;
  studentName = '';
  currentAssignment: Assignment = new AssignmentModel(this.group_id);
  createAssignFlag = false;
  

  constructor(
    private assignSvc: AssignmentService,
    private activeRoute: ActivatedRoute,
    private userSvc: UserService
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(response => {
    this.student_id = response.idStudent
    this.group_id = response.id
    this.currentUser = this.userSvc.getCurrentUser();
    this.currentAssignment.group_id = this.group_id
    this.currentUser = this.userSvc.getCurrentUser();
    if (this.student_id) this.getStudentName()
    })

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]),
      note: new FormControl('', [Validators.maxLength(200)])
    })

    this.assignSvc.getAssignments(this.group_id, this.student_id).subscribe(res =>{
      this.assignments = res;
    })
   
  }
  getStudentName(){
    this.assignSvc.getStudentName(this.group_id).subscribe(res =>{
      let index = res['data']['users'].findIndex(usr => usr['id'] == this.student_id);
      this.studentName =  `${res['data']['users'][index].first_name} ${res['data']['users'][index].last_name}`;
    })
  }

  addProblem(){
    //this.currentAssignment.problems.push({id:1})
  }

  onSubmit() {
    if (this.assignSvc.addAssign(this.currentAssignment))
      this.currentAssignment.title = '';
    this.currentAssignment.description = '';
    this.createAssignFlag = false;
  }
}
