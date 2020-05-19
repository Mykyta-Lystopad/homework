import { Location } from '@angular/common';
import { Problem } from './../../../../core/models/problem.model';
import {User} from '../../../../core/models';
import {AssignmentModel} from '../../../../core/models/assignmentModel';
import {Assignment} from '../../../../core/models/assignment.model';
import { Component, OnInit, enableProdMode } from '@angular/core';
import {AssignmentService} from "../../../../core/services/assigntments.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../core/services";


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  showCreateProblem = false;
  showEditAssignment = false;
  studentId: number;
  user: User;
  private assignId: number;
  currentProblem: Problem = {
    id : undefined,
    title: '',
    description: '',
  } 
  assign: Assignment = new AssignmentModel(this.assignId);
  currentAssign: Assignment = new AssignmentModel(this.assignId);

 
  constructor(
    route: ActivatedRoute,
    private assingSvc: AssignmentService,
    private userSvc: UserService,
    private location: Location
    )
  {
    this.user = this.userSvc.getCurrentUser();
    this.assignId = +route.snapshot.params.id;
    if (this.user.role === 'teacher') {
      this.studentId = +route.snapshot['parent']['params']['idStudent']; 
      if (isNaN(this.studentId)){
        this.studentId = undefined
      }
    } else {
      this.studentId = this.user.id
    }
    this.currentProblem.assignment_id = this.assignId;    
  }


  ngOnInit(): void {
    this.assingSvc.getAssign(this.assignId, this.studentId).subscribe(res => {      
      this.assign = res['data']
      if (isNaN(this.studentId)){
        this.studentId = undefined
      }
      this.assign.student_id = this.studentId
      console.log('assign ',this.assign);
      
    })

  }
  assignDelete(){
    if (confirm(`Do you really want to delete ${this.assign.title} assignment?`))
    this.assingSvc.deleteAssignment(this.assignId).subscribe(res => {
    this.location.back();
    })
  }
  showEditAssign(){
    if (this.user.role == 'teacher' && !this.studentId){
      this.showEditAssignment = !this.showEditAssignment
      this.currentAssign.title = this.assign.title
      this.currentAssign.description = this.assign.description    
    }    
  }
  assignmentEdit(){
    this.assingSvc.editAssignment(this.currentAssign).subscribe(res =>{
      this.assign.title = res.data.title
      this.assign.description = res.data.description
      this.showEditAssignment = false;
    })
  }


  createProblem(){
    this.assingSvc.createProblem(this.currentProblem).subscribe(res => {
      if (res.success === true){
        this.assign.problems.push(res['data'])
      }
    })
      this.showCreateProblem = !this.showCreateProblem
      this.currentProblem.title = ''
      this.currentProblem.description = ''
  }
  probDel(probId: number){
    this.assingSvc.deleteProblem(probId).subscribe(res => {
        let index = this.assign.problems.findIndex(prob => prob.id === probId)
        this.assign.problems.splice(index,1)
    })
  }
  probEdit(prob: Problem){
    this.assingSvc.updateProblem(prob).subscribe(res => {
      if (res.success){
        let index = this.assign.problems.findIndex(prob => prob.id == res.data.id)
        this.assign.problems[index].title = res.data.title;
        this.assign.problems[index].description = res.data.description;
      }
    })
  }
  probCompletedChsnge(e:{}){
    console.log(e['problem_id']);
    console.log(this.assign);
    let index = this.assign.problems.findIndex(prob => prob.id == e['problem_id'])
    if (!this.assign.problems[index].userSolution){
      this.assingSvc.completedProblemSolve(e).subscribe(res => {    
      this.assign.problems[index].userSolution.completed = res['data']['completed']
      })
    } else {
      console.log('перед передачей параметры',e);
      
      this.assingSvc.changeSolutionStatus(this.assign.problems[index].userSolution.id, {completed:e['completed']}).subscribe(res => {    
      this.assign.problems[index].userSolution.completed = res['data']['completed']
    }
      )}

  }

  back(){
    this.location.back();
  }
  sendMessage(){
    
  }
  

}
