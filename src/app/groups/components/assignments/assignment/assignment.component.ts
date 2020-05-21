import { AttachmentService } from './../../../../core/services/attachment.service';
import { Message } from './../../../../core/models/message.model';
import { Location } from '@angular/common';
import { Problem } from './../../../../core/models/problem.model';
import {User} from '../../../../core/models';
import {AssignmentModel} from '../../../../core/models/assignmentModel';
import {Assignment} from '../../../../core/models/assignment.model';
import { Component, OnInit} from '@angular/core';
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
  groupId: number;
  studentName = '';
  message: Message = {
    id: null,
    message: '',
    student_id: null,
    assignment_id: null,
  };  
  currentProblem: Problem = {
    id : undefined,
    title: '',
    description: '',
  };
  user: User;
  private assignId: number;
  assign: Assignment = new AssignmentModel(this.assignId);
  attachments: [][];
  currentAssign: Assignment = new AssignmentModel(this.assignId);

 
  constructor(
    private attachmentService: AttachmentService,
    route: ActivatedRoute,
    private assignSvc: AssignmentService,
    private userSvc: UserService,
    private location: Location
    )
  {
    this.assignId = +route.snapshot.params.id;
    this.currentProblem.assignment_id = this.assignId;
    this.currentAssign.id = this.assignId;
    this.user = this.userSvc.getCurrentUser();

    if (this.user.role === 'teacher') {
      this.studentId = +route.snapshot['parent']['params']['idStudent']; 
      this.groupId = +route.snapshot['parent']['parent']['params']['id']; 
      if (isNaN(this.studentId)){
        this.studentId = undefined
      }
    } else {
      this.studentId = this.user.id
    }
    this.currentProblem.assignment_id = this.assignId;    
  }


  ngOnInit(): void {
    this.assignSvc.getAssign(this.assignId, this.studentId).subscribe(res => {      
      this.assign = res['data']
      this.attachments = this.attachmentService.createDoubleArray(res['data'].attachments, 5);
      if (isNaN(this.studentId)){
        this.studentId = undefined
      }
      this.assign.student_id = this.studentId
      this.currentAssign.id = this.assign.id
      if (this.studentId && this.user.role == 'teacher') this.getStudentName()
    })    
  }
  back(){
    this.location.back();
  }
  getStudentName(){
    this.assignSvc.getStudentName(this.groupId).subscribe(res =>{
      let index = res['data']['users'].findIndex(usr => usr['id'] == this.studentId);
      this.studentName =  `${res['data']['users'][index].first_name} ${res['data']['users'][index].last_name}`;
    })
  }
  ///////////////////////////////////////////////////// Assign ///////////////////////////////////////////
  assignDelete(){
    if (confirm(`Do you really want to delete ${this.assign.title} assignment?`))
    this.assignSvc.deleteAssignment(this.assignId).subscribe(res => {
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
    this.assignSvc.editAssignment(this.currentAssign).subscribe(res =>{
      this.assign.title = res.data.title
      this.assign.description = res.data.description
      this.showEditAssignment = false;
    })
  }

  //////////////////////////////////////////////////// Problem ///////////////////////////////////////////
  createProblem(){
    this.assignSvc.createProblem(this.currentProblem).subscribe(res => {
      if (res.success === true){
        this.assign.problems.push(res['data'])
      }
    })
      this.showCreateProblem = !this.showCreateProblem
      this.currentProblem.title = ''
      this.currentProblem.description = ''
  }
  probDel(probId: number){
    this.assignSvc.deleteProblem(probId).subscribe(res => {
        let index = this.assign.problems.findIndex(prob => prob.id === probId)
        this.assign.problems.splice(index,1)
    })
  }
  probEdit(prob: Problem){
    this.assignSvc.updateProblem(prob).subscribe(res => {
      if (res.success){
        let index = this.assign.problems.findIndex(prob => prob.id == res.data.id)
        this.assign.problems[index].title = res.data.title;
        this.assign.problems[index].description = res.data.description;
      }
    })
  }
  probCompletedChsnge(e:object){

    let index = this.assign.problems.findIndex(prob => prob.id == e['problem_id'])
    if (!this.assign.problems[index].userSolution){
      this.assignSvc.completedProblemSolve(e).subscribe(res => {    
      this.assign.problems[index].userSolution.completed = res['data']['completed']
      })
    } else {
      this.assignSvc.changeSolutionStatus(this.assign.problems[index].userSolution.id, {completed:e['completed']}).subscribe(res => {    
      this.assign.problems[index].userSolution.completed = res['data']['completed']
    }
      )}

  }

  ////////////////////////////////////////////////////////////// Messages ///////////////////////////////////
  sendMessage(){
      this.message.assignment_id = this.assign.id;
      this.message.student_id = this.studentId;
      this.message.attachments = null;
      this.assignSvc.createMessage(this.message).subscribe(res => {
      this.assign.userAnswer.messages.push(res['data'])
      this.message.message = ''
    })
  } 
  editMessage(mess:object){
    
    this.assignSvc.editMessage(mess).subscribe(res => {
      let index = this.assign.userAnswer.messages.findIndex(message => mess['messageId'] == message.id)
      this.assign.userAnswer.messages[index].message = mess['message']
    })
  }
  deleteMessage(messageId: number){
    this.assignSvc.deleteMessage(messageId).subscribe(res => {
      let index = this.assign.userAnswer.messages.findIndex(mess => mess.id == messageId)
      this.assign.userAnswer.messages.splice(index, 1)
    })    
  }
  

}
