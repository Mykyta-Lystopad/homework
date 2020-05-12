import {UserService} from './user.service';
import {ApiService} from './api.service';
import {User} from './../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Assignment} from '../models/assignment.model';

@Injectable({
  providedIn: "root"
})

export class AssignmentService {
  private assignments: Assignment[];
  private subj: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private apiSvc: ApiService,
    private userSvc: UserService
  ) {
  }

  get $assignments(): Observable<Assignment[]> {
    return this.subj.asObservable();
  }

  getAssignments() {
    if (this.userSvc.isAuth) {
      this.apiSvc.get('api/assignments?page=1&group_id=1').subscribe(res => { // да, это хардкод, когда будет надстройки - сделаю по нормальному
        this.assignments = res['data']['collection'];
        this.subj.next(this.assignments);
      })
    }
  }

  getAssign(assignId: number, userId: number) {
    return this.apiSvc.get(`api/assignments/${assignId}?user_id=${userId}`)
  }

  addAssign(assign: Assignment) {
    let success: boolean;
    this.apiSvc.post('api/assignments', assign)
      .subscribe(res => {
        success = res.success;
        this.assignments.push(res['data']);
        this.subj.next(this.assignments);
      }, error => {
        alert(`Can't add assignment. Error:` + error['data']['description'])
      });
    return success;
  }
}
