import { Problem } from './../../../../core/models/problem.model';
import {User} from './../../../../core/models/user.model';
import {UserService} from './../../../../core/services/user.service';
import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../../../../core/services/assigntments.service";
// import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "../../../../core/models/assignment.model";
import {AssignmentModel} from "../../../../core/models/assignmentModel";
import {ActivatedRoute} from "@angular/router";
import { formatDate } from '@angular/common';
import { ProblemModel } from 'src/app/core/models/problemModel';



@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(response => {
    this.student_id = response.idStudent
    this.group_id = response.id
    this.currentUser = this.userSvc.getCurrentUser();
    this.currentAssignment.group_id = this.group_id
    this.currentUser = this.userSvc.getCurrentUser();
    if (this.student_id) this.getStudentName()
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
  showNewAssignBlock(){
    this.createAssignFlag = !this.createAssignFlag
    this.showAssignDetail(null)
    this.currentAssignment.title = formatDate(new Date(), 'dd/MM/yyyy', 'en') + ': '
  }

  addProblem(){
    let prob: Problem = new ProblemModel(null)
    this.currentAssignment.problems.push(prob)
  }
  removeProblem(index: number){
    this.currentAssignment.problems.splice(index,1)
  }

  hideCreateAssign(flag:boolean){
    this.createAssignFlag = flag
  }
  showAssignDetail(i?:number){
    this.assignments.forEach(elem => {elem.show = false})
    if (i !== null){
      this.assignments[i].show = !this.assignments[i].show;
      this.createAssignFlag = false;
    }
    
  }
}
