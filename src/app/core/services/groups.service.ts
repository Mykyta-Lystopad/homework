import { GroupModel } from './../models/groupModel';
import {Injectable} from '@angular/core';
import {Group} from "../models/group.model";
import {BehaviorSubject, Subject} from "rxjs";
import {ApiService} from "./api.service";
import {map, tap} from "rxjs/operators";
import {AlertService} from "./alert.service";
import { debug } from 'console';

@Injectable()
export class GroupsService {

  private groups: Group[] = []
  private groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  private idGroup$ = new Subject();

  constructor(private apiService: ApiService,
              private alertService: AlertService) {
  }
  collectErrors(errorObj:object):string{
    if (typeof(errorObj) == 'string'){
      return errorObj
    } else {
    let errors = ''
    for (const err in errorObj) {
        errors =  errors + `${err} : ${errorObj[err]} ` + '\n'        
      }
    return errors;
    }    
  }

  get group() {
    return this.groups$.asObservable();
  }

  get idGroup() {
    return this.idGroup$.asObservable()
  }

  get allGroups() {
    return this.groups
  }

  load(role: string) {

    this.apiService.get(`api/profile/${role === 'teacher' ? 'my' : 'user'}Groups`)
      .pipe(map(response => {
        if (role === 'teacher') return response.data.collection;
        else return response.data;
      })).subscribe(response => {
      this.groups = response; 
      this.groups$.next(this.groups);
      if (this.groups.length) {
        this.idGroup$.next(this.groups[0].id)
      }
    })
  }

  remove(id: number) {
    this.apiService.delete(`api/groups/${id}`)
      .subscribe(_ => this.alertService.danger("Группа удалена"))
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id == id) {
        this.groups.splice(i, 1);
        break
      }
    }
    this.groups$.next(this.groups);

  }

  createGroup(obj:object) {
    return this.apiService.post('api/groups',obj).pipe(tap(res => {
      let group = new GroupModel()
      group.id = res['data']['id']
      group.title = res['data']['title']
      group.subject = res['data']['subject']
      group.model_code = res['data']['model_code']
      group.qr_code_link = res['data']['qr_code_link']
      this.groups.unshift(group)
      this.groups$.next(this.groups);
      this.alertService.success("Група створена")
    }, error => {
      this.alertService.danger(this.collectErrors(error['data']))
      console.log(this.collectErrors(error['data']));
    }))
  }

  changeGroup(obj:object) {
    return this.apiService.put(`api/groups/${obj['id']}`, obj).pipe(tap(res => {
      let index = this.groups.findIndex(elem => elem.id == obj['id'])
      this.groups[index].title = res['data']['title']
      this.groups[index].subject = res['data']['subject']
      this.groups$.next(this.groups);
      this.alertService.success("Група оновлена")
    }, error => {
      this.alertService.danger(this.collectErrors(error['data']))
      console.log(this.collectErrors(error['data']));
      
    }))
  }

  getGroup(id: number) {
    return this.apiService.get(`api/groups/${id}`).pipe(tap(res => {
    }, error => {
      this.alertService.danger(this.collectErrors(error['data']))
    }))
  }

  getSubjects(){
    return this.apiService.get('api/subjects')
  }
  addStudentByCode(groupId: number, studentCode: number){
    return this.apiService.get(`api/groups/${groupId}/bindStudent/${studentCode}`).pipe(tap(res => {
      this.alertService.success('Користувача до групи додано')
    }, error => {
      this.alertService.danger(this.collectErrors(error['data']))
    }))
  }
  bindGroup(code:string){
    return this.apiService.get(`api/bindGroup/${code}`).pipe(tap(res => {
      let newGroup = new GroupModel() 
      newGroup.id = res['data'].id
      newGroup.model_code = res['data'].model_code
      newGroup.qr_code_link = res['data'].qr_code_link
      newGroup.subject = res['data'].subject
      newGroup.title = res['data'].title
      newGroup.users = res['data'].users
      this.groups.push(newGroup)
      this.groups$.next(this.groups);
      this.alertService.success('Групу додано')
    }, error => {
      this.alertService.danger(this.collectErrors(error['data']))
    }))
  }
  removeStudent(groupId: number, studentId:number){
    return this.apiService.delete(`api/groups/${groupId}/removeStudent/${studentId}`).pipe(tap(res => {
      this.alertService.success('Користувача із групи видалено')
    }, error => {
      this.alertService.danger(this.collectErrors(error['data']))
    }))
  }
  
}
