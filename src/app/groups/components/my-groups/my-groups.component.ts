import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Group} from '../../../core/models/group.model';
import {ApiService, RoleService, UserService} from '../../../core/services';
import {Router} from "@angular/router";

import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  group: Group[];
  title = '';
  activeTab = false;
  idGroup: number;
  showTitleBlock = false;
  role: string;
  showEditBlock = false;
  storage: any = window.localStorage;

  constructor(
    private  apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
  }

  ngOnInit(): void {
    this.role = this.storage.getItem(environment.KEY_ROLE)
    this.roleService.getUserGroups(this.role).subscribe(response=>{
      this.groups$.next(response);
      this.group = response;
      if (this.group) {
        this.idGroup = this.group[0].id;
        this.role === 'teacher'? this.router.navigate(['groups', this.idGroup]):
          this.router.navigate(['groups', this.idGroup,'allAssignments', this.idGroup]);
      }
    })

  }

  addGroup() {
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

  deleteGroup(id: number) {
    this.apiService.delete(`api/groups/${id.toString()}`)
      .subscribe(() => {
        this.group = this.group.filter(group => group.id !== id);
        this.groups$.next(this.group);
      });
  }

  showUsers(id: number) {
    this.idGroup = id;
    this.activeTab=false
    this.router.navigate(['groups', this.idGroup]);
  }

}
