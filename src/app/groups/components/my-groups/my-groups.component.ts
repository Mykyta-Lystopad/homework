import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Group} from '../../../core/models/group.model';
import {ApiService, GroupsService, RoleService, UserService} from '../../../core/services';
import {Router} from "@angular/router";

import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  groupsTets$: Observable<Group[]>
  group: Group[];
  title = '';
  activeTab = 'student';
  idGroup: number;s
  role: string;
  storage: any = window.localStorage;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private groupService: GroupsService
  ) {
  }

  ngOnInit(): void {
    this.role = this.storage.getItem(environment.KEY_ROLE)
    this.groupsTets$ = this.groupService.group
    this.groupService.load(this.role)

    this.groupsTets$.subscribe(groups => {
      if (groups.length) {
        this.idGroup = groups[0].id
        this.role === 'teacher' ? this.router.navigate(['groups', this.idGroup]) :
          this.router.navigate(['groups', this.idGroup, 'allAssignments', this.idGroup]);
      }
    })

  }

  addGroup() {
    this.groupService.add(this.title, 1)
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
    this.activeTab = 'student'
    this.router.navigate(['groups', this.idGroup]);
  }
}
