import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Group} from '../../../core/models/group.model';
import {ApiService} from '../../../core/services';
import {map} from 'rxjs/operators';
import {RelationshipsService} from '../../../core/services/relationships.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  group: Group[];
  activeTab = false;
  title = '';
  idGroup: number;
  showTitleBlock = false;

  constructor(
    private  apiService: ApiService,
    private relationshipsService: RelationshipsService) {
  }

  ngOnInit(): void {
    this.apiService.get('api/profile/myGroups')
      .pipe(map(response => {
        return response.data.collection;
      })).subscribe(response => {
      this.groups$.next(response);
      this.group = response;
    });
  }

  addGroup() {
    // проверка на заполнение title
    this.apiService.post('api/groups', {
      title: this.title,
      subject_id: 1
    })
      .subscribe((res) => {
        this.title = '';
        this.showTitleBlock = false;
        this.group.unshift(res.data);
        this.groups$.next(this.group);
      });
  }

  getUsersGroup(id: number) {
    this.idGroup = id;
    this.relationshipsService.setId(id);
  }

  deleteGroup(id: number) {
    this.apiService.delete(`api/groups/${id.toString()}`)
      .subscribe(() => {
        this.group = this.group.filter(group => group.id !== id);
        this.groups$.next(this.group);
      });
  }
}
