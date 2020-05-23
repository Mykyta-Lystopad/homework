import {Injectable} from '@angular/core';
import {Group} from "../models/group.model";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "./api.service";
import {map} from "rxjs/operators";

@Injectable()
export class GroupsService {

  private groups: Group[] = []
  private groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);

  constructor(private apiService: ApiService) {
  }

  get group() {
    return this.groups$.asObservable();
  }


  load(role: string) {
    this.apiService.get(`api/profile/${role ==='teacher'? 'my':'user'}Groups`)
      .pipe(map(response => {
        if ( role ==='teacher')return response.data.collection;
        else return response.data;
      })).subscribe(response => {
      this.groups = response;
      this.groups$.next(this.groups);
      console.log(this.groups)
    })
  }

  remove(id: number) {
    this.apiService.delete(`api/groups/${id}`).subscribe(res=>{
      //deleted
    })
    this.groups = this.groups.filter(group=>{
     // if ( )
      group.id !== id
    })
    console.log(this.groups)
    this.groups$.next(this.groups);
  }

  add(title: string, subject_id: number) {
    this.apiService.post('api/groups', {
      title: title,
      subject_id
    })
      .subscribe((res) => {
        this.groups.push(res.data);
        this.groups$.next(this.groups);
      });
  }
}
