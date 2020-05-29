import {Injectable} from '@angular/core';
import {Group} from "../models/group.model";
import {BehaviorSubject, Subject} from "rxjs";
import {ApiService} from "./api.service";
import {map} from "rxjs/operators";
import {AlertService} from "./alert.service";

@Injectable()
export class GroupsService {

  private groups: Group[] = []
  private groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  private idGroup$ = new Subject();

  constructor(private apiService: ApiService,
              private alertService: AlertService) {
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
    console.log("LOAD")
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

  add(title: string, subject_id: number) {
    this.apiService.post('api/groups', {
      title,
      subject_id
    })
      .subscribe((res) => {
        this.groups.push(res.data);
        this.groups$.next(this.groups);
        this.alertService.success("Группа добавлена")

      });
  }

  changeGroup(id: number, title: string) {
    this.apiService.put(`api/groups/${id}`, {title}).subscribe(response => {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i].id == +id) {
          this.groups[i].title = title
          break
        }
      }
      this.groups$.next(this.groups);
      this.alertService.success("Группа изменена")
    })
  }

  getGroup(id: number) {
    let group: Group
    group = this.groups.find(g=>g.id==id
    )
    return group
  }
}
