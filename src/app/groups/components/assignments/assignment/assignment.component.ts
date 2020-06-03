import { DatePipe } from '@angular/common';
import { ProblemModel } from './../../../../core/models/problemModel';
import { AttachmentService } from './../../../../core/services/attachment.service';
import { Message } from './../../../../core/models/message.model';
import { Problem } from './../../../../core/models/problem.model';
import {User} from '../../../../core/models';
import {AssignmentModel} from '../../../../core/models/assignmentModel';
import {Assignment} from '../../../../core/models/assignment.model';
import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
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
  showEditAssignmentTitle = false;
  showEditAssignmentDescription = false;
  showEditDueDate = false;
  showNewMessage = false;
  @Output() emitHideCreateAssign: EventEmitter<boolean> = new EventEmitter()
  @Input() assignCreationMode = false
  @Input() assignId: number;  
  studentId: number;
  groupId: number;
  user: User;
  assign: Assignment = new AssignmentModel(this.assignId);
  currentAssign: Assignment = new AssignmentModel(this.assignId);  
  attachments: [][];
  @ViewChild('assignTitleEl') assignTitleEl: ElementRef;
  @ViewChild('addProblemEl') addProblemEl: ElementRef;
  @ViewChild('assignNoteEl') assignNoteEl: ElementRef;
  @ViewChild('editDueDateEl') editDueDateEl: ElementRef;
  @ViewChild('newMessageEl') newMessageEl: ElementRef;
  message: Message = {
    id: null,
    message: '',
    student_id: null,
    assignment_id: null,
  };  
  currentProblem: Problem = {
    id : undefined,
    title: '',
  };
  counter = 1;// counter for unique id-s for new assignments problems

 
  constructor(
    private attachmentService: AttachmentService,
    route: ActivatedRoute,
    private assignSvc: AssignmentService,
    private userSvc: UserService,
    private datePipe: DatePipe)
  {
    this.assignId = +route.snapshot.params.id;
    this.currentProblem.assignment_id = this.assignId;
    this.currentAssign.id = this.assignId;
    this.user = this.userSvc.getCurrentUser();

    if (this.user.role === 'teacher') {
      this.studentId = +route.snapshot['parent']['params']['idStudent']; 
      this.groupId = +route.snapshot['parent']['parent']['params']['id']; 
      this.assign.group_id = this.groupId
      if (isNaN(this.studentId)){
        this.studentId = undefined
      }
      } else {
        this.studentId = this.user.id
      }
    this.currentProblem.assignment_id = this.assignId;    
  }


  ngOnInit(): void {
    if (!this.assignCreationMode){
      this.assignSvc.getAssign(this.assignId, this.studentId).subscribe(res => {      
        this.assign = res['data']
        this.attachments = this.attachmentService.createDoubleArray(res['data'].attachments, 5);
        if (isNaN(this.studentId)){
          this.studentId = undefined
        }
        this.assign.student_id = this.studentId
        this.currentAssign.id = this.assign.id
        //if (this.studentId && this.user.role == 'teacher') this.getStudentName()
      })    
    } else {
      this.assign.title = ""
    }
    if (this.counter == 1 && this.assignCreationMode){
      this.createProblem()
    }
    
  }  
  // getStudentName(){
  //   this.assignSvc.getStudentName(this.groupId).subscribe(res =>{
  //     let index = res['data']['users'].findIndex(usr => usr['id'] == this.studentId);
  //     this.studentName =  `${res['data']['users'][index].first_name} ${res['data']['users'][index].last_name}`;
  //   })
  // }

  ///////////////////////////////////////////////////// Assign ///////////////////////////////////////////
  createAssign(){
    this.assign.problems.forEach(element => {
      element.id = undefined
    });
    this.assignSvc.addAssign(this.assign).subscribe(res => {
      this.assign.title = ''
      this.assign.description = ''
      this.assign.problems = null;
      this.counter = 1;
      this.emitHideCreateAssign.emit(false)
    })
  }
  
  assignDelete(){
    if (!this.assignCreationMode){
      if (confirm(`Do you really want to delete ${this.assign.title} assignment?`))
        this.assignSvc.deleteAssignment(this.assignId).subscribe(res => {})
    } else {
      this.emitHideCreateAssign.emit(false)
    }

  }
  showEditAssign(source: string){
    if (this.user.role == 'teacher' && !this.studentId){
      if (source == 'title'){
        this.showEditAssignmentTitle = !this.showEditAssignmentTitle
        setTimeout(()=>{this.assignTitleEl.nativeElement.focus()},0)
        this.currentAssign.title = this.assign.title
      }else{
        this.showEditAssignmentDescription = !this.showEditAssignmentDescription
        setTimeout(()=>{this.assignNoteEl.nativeElement.focus()},0)
        this.currentAssign.description = this.assign.description  
      } 
    }    
  }
  assignmentEdit(source:string){

    if (source == 'title'){ //title
      if (!this.assignCreationMode){
        if (this.currentAssign.title){
          if (this.currentAssign.title != this.assign.title) 
          {
            this.assignSvc.editAssignment(this.currentAssign).subscribe(res =>{
            this.assign.title = res.data.title
            })
          }
            this.assign.description = this.currentAssign.description
        } else {
          this.assignDelete()
        }
      }else{
        this.assign.title = this.currentAssign.title
      }
      this.showEditAssignmentTitle = false
    } else { //description
      if (!this.assignCreationMode){
        if (this.currentAssign.description != this.assign.description){
          this.currentAssign.title = this.assign.title
          this.assignSvc.editAssignment(this.currentAssign).subscribe(res =>{
          this.assign.title = res.data.title
          this.assign.description = res.data.description
          })
        }
         
      }else{
        this.assign.description = this.currentAssign.description
      }
    this.showEditAssignmentDescription = false     
    }
  }

  changeEditDueDate(){
    if (this.user.role == "teacher" && !this.studentId){
      this.showEditDueDate = true
    }
    this.currentAssign.due_date = this.assign.due_date
    setTimeout(()=>{this.editDueDateEl.nativeElement.focus()},0)
  }
  dueDatePick(){
    if (this.assignCreationMode){
      this.assign.due_date = this.currentAssign.due_date
      let str = this.datePipe.transform(this.currentAssign.due_date , 'dd.MM.yyyy')
      if (!this.assign.title) this.assign.title = str;
    } else {      
      this.currentAssign.title = this.assign.title
      this.currentAssign.description = this.assign.description
      this.assignSvc.editAssignment(this.currentAssign).subscribe(res =>{
        this.assign.due_date = res.data.due_date  
      })
    }
    this.showEditDueDate = false 
  }

  //////////////////////////////////////////////////// Problem ///////////////////////////////////////////
  toShowCreateProblem(){
    this.showCreateProblem = !this.showCreateProblem
    setTimeout(()=>{ this.addProblemEl.nativeElement.focus()},0); 
  }
  createProblem(){
    if (!this.assignCreationMode){
      if (this.currentProblem.title){
        this.assignSvc.createProblem(this.currentProblem).subscribe(res => {
          if (res.success === true){
            this.assign.problems.push(res['data'])
          }
        }) 
      }    
 
    } else {      
      if (this.currentProblem.title){        
        let problem:Problem = new ProblemModel(this.assign.id)
        problem.title = this.currentProblem.title
        problem.id = this.counter
        setTimeout(()=>{this.assign.problems.push(problem) },0); 
        this.counter++
      } 
    }
      this.showCreateProblem = false;
      this.currentProblem.title = ''
    
  }
  probDel(probId: number){
    if (!this.assignCreationMode){
      this.assignSvc.deleteProblem(probId).subscribe(res => {
        let index = this.assign.problems.findIndex(prob => prob.id === probId)
        this.assign.problems.splice(index,1)
      })
    } else {
      let index = this.assign.problems.findIndex(prob => prob.id === probId)
      this.assign.problems.splice(index,1)
    }

  }
  probEdit(prob: Problem){
    if (!this.assignCreationMode){
      this.assignSvc.updateProblem(prob).subscribe(res => {
        if (res.success){
          let index = this.assign.problems.findIndex(prob => prob.id == res.data.id)
          this.assign.problems[index].title = res.data.title;
        }
      })
    } else {
      let index = this.assign.problems.findIndex(probl => probl.id === prob.id)
      this.assign.problems[index].title = prob.title
    }
         
  }
  probCompletedChange(e:object){

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
    if (this.message.message){
      this.message.assignment_id = this.assign.id;
      this.message.student_id = this.studentId;
      this.assignSvc.createMessage(this.message).subscribe(res => {
      this.assign.userAnswer.messages.push(res['data'])
      this.message.message = ''
      })
    }
    this.showNewMessage = false;
  } 
  toShowEditMessage(){
    this.showNewMessage = true
    setTimeout(()=>{this.newMessageEl.nativeElement.focus()},0)
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
