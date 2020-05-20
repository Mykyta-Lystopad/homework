import { Message } from './../models/message.model';
import { AlertService } from './alert.service';
import { Problem } from './../models/problem.model';
import {UserService} from './user.service';
import {ApiService} from './api.service';
import { BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Assignment} from '../models/assignment.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
}) 

export class AssignmentService {
  private assignments: Assignment[];
  private subj: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(
    private apiSvc: ApiService,
    private userSvc: UserService,
    private alertSvc: AlertService,
  ) {
  }

  get $assignments(): Observable<Assignment[]> {
    return this.subj.asObservable();
  }

  getAssignments(group_id: number, student_id?: number) {
    if (this.userSvc.isAuth) {
      let student_idStr = ''
      if (student_id){
        student_idStr = `&user_id=${student_id}`
      }
        this.apiSvc.get(`api/assignments?page=1&group_id=${group_id}${student_idStr}`).subscribe(res => {
        this.assignments = res['data']['collection'];
        this.subj.next(this.assignments);
      })
    }
    return this.subj;
  }
  ///////////////////////////////////////////////////// Assign ///////////////////////////////////////////
  getAssign(assignId: number, userId: number) {
    return this.apiSvc.get(`api/assignments/${assignId}?user_id=${userId}`)
  }

  addAssign(assign: Assignment) {
    let success: boolean;
    this.apiSvc.post('api/assignments', assign)
      .subscribe(res => {
        this.alertSvc.success('New assignment created successful')
        success = res.success;
        this.assignments.unshift(res['data']);
        this.subj.next(this.assignments);
      }, error => {
        this.alertSvc.danger(error['data'])
      });
    return success;
  }
  deleteAssignment(assignId: number){
    return this.apiSvc.delete(`api/assignments/${assignId}`).pipe(tap(res => {
      this.alertSvc.success('Assignment deleted successfsul')
      let index = this.assignments.findIndex(assign => assign.id == assignId)
      this.assignments.splice(index, 1)
      this.subj.next(this.assignments)
    }, error => {
      this.alertSvc.danger(error['data'])
    }))
  }
  editAssignment(assin: Assignment){
    return this.apiSvc.put(`api/assignments/${assin.id}`,assin).pipe(tap(res => {
      this.alertSvc.success('Assignment changed successfsul')
    }, error => {
      this.alertSvc.danger(error['data'])
    }))
  }
  ////////////////////////////////////////////////////// Problems ////////////////////////////////////////
  createProblem(problem:Problem){
    return this.apiSvc.post('api/problems',problem).pipe(tap(res => {
      this.alertSvc.success('Problem added successfsul')
    }, error => {
      this.alertSvc.danger(error['data'])
    }))
  }
  deleteProblem (problemId: number){
    return this.apiSvc.delete(`api/problems/${problemId}`).pipe(tap(res => {
      this.alertSvc.success('Problem deleted successfsul')
    }, error => {
      this.alertSvc.danger(error['data'])
    }))
  }
  updateProblem(prob:Problem){
    return this.apiSvc.put(`api/problems/${prob.id}`,prob).pipe(tap(res => {
      this.alertSvc.success('Problem changed successfsul')
    }, error => {
      this.alertSvc.danger(error['data'])
    }))
  }
  ///////////////////////////////////////////// Solutions ////////////////////////////////////////////
  completedProblemSolve(e:object){
     return this.apiSvc.post('api/solutions', e).pipe(tap( res =>{
      if (res['data']['completed'] === true){
        this.alertSvc.success('Problem checked as solved')
      } else{
        this.alertSvc.success('Problem checked as not solved')
      }
    }, error => {
      this.alertSvc.danger(error['data'])
    }))
  }
  changeSolutionStatus(solutionId: number, completed:object){
    return this.apiSvc.put(`api/solutions/${solutionId}`, completed).pipe(tap( res =>{
     if (res['data']['completed'] === true){
       this.alertSvc.success('Problem checked as solved')
     } else{
       this.alertSvc.success('Problem checked as not solved')
     }
   }, error => {
     this.alertSvc.danger(error['data'])
   }))
 }
//////////////////////////////////// Messages ///////////////////////////////////////////////////////
 createMessage(message: Message){
  return this.apiSvc.post('api/messages', message).pipe(tap(res => {
    this.alertSvc.success('Message was sent')
  }, error => {
    this.alertSvc.danger(error['data'])
  }))
 }
 editMessage(mess:object){
   let message = {message: mess['message']}
  return this.apiSvc.put(`api/messages/${mess['messageId']}`, message).pipe(tap(res => {
    console.log(res['data']);
    
    this.alertSvc.success('Message was updated')
  }, error => {
    this.alertSvc.danger(error['data'])
  }))
 }
 deleteMessage(messageId: number){
  return this.apiSvc.delete(`api/messages/${messageId}`).pipe(tap(res => {
    this.alertSvc.success('Message was deleted')
  }, error => {
    this.alertSvc.danger(error['data'])
  }))
 }

}
