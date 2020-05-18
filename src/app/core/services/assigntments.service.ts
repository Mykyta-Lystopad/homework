import { AlertService } from './alert.service';
import { Problem } from './../models/problem.model';
import {UserService} from './user.service';
import {ApiService} from './api.service';
import {User} from './../models/user.model';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
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

  getAssignments(group_id: number) {
    if (this.userSvc.isAuth) {
      this.apiSvc.get(`api/assignments?page=1&group_id=${group_id}`).subscribe(res => {
        this.assignments = res['data']['collection'];
        this.subj.next(this.assignments);
      })
    }
    return this.subj;
  }

  getAssign(assignId: number, userId: number) {
    return this.apiSvc.get(`api/assignments/${assignId}?user_id=${userId}`)
  }

  addAssign(assign: Assignment) {
    let success: boolean;
    this.apiSvc.post('api/assignments', assign)
      .subscribe(res => {
        this.alertSvc.success('New assignment created successful')
        success = res.success;
        this.assignments.push(res['data']);
        this.subj.next(this.assignments);
      }, error => {
        this.alertSvc.danger(error['data']['description'])
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
      this.alertSvc.danger(error['data']['description'])
    }))
  }
  editAssignment(assin: Assignment){
    return this.apiSvc.put(`api/assignments/${assin.id}`,assin).pipe(tap(res => {
      this.alertSvc.success('Assignment changed successfsul')
    }, error => {
      this.alertSvc.danger(error['data']['description'])
    }))
  }

  createProblem(problem:Problem){
    return this.apiSvc.post('api/problems',problem).pipe(tap(res => {
      this.alertSvc.success('Problem added successfsul')
    }, error => {
      this.alertSvc.danger(error['data']['description'])
    }))
  }
  deleteProblem (problemId: number){
    return this.apiSvc.delete(`api/problems/${problemId}`).pipe(tap(res => {
      this.alertSvc.success('Problem deleted successfsul')
    }, error => {
      this.alertSvc.danger(error['data']['description'])
    }))
  }
  updateProblem(prob:Problem){
    return this.apiSvc.put(`api/problems/${prob.id}`,prob).pipe(tap(res => {
      this.alertSvc.success('Problem changed successfsul')
    }, error => {
      this.alertSvc.danger(error['data']['description'])
    }))
  }

}
