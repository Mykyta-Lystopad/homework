import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../core/models/group.model';
import {GroupsService, RoleService} from '../../../core/services';
import {Router} from "@angular/router";

import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  groups$: Observable<Group[]>
  activeTab = 'student';
  idGroup: number;
  role: string;
  storage: any = window.localStorage;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private groupService: GroupsService
  ) {
  }

  ngOnInit(): void {
    this.role = this.storage.getItem(environment.KEY_ROLE)
    this.groups$ = this.groupService.group
    this.groupService.load(this.role)
    setTimeout(_=>{
      this.idGroup = this.groupService.getGroupId()
      if ( this.idGroup) {
        this.role === 'teacher' ? this.router.navigate(['groups', this.idGroup]) :
          this.router.navigate(['groups', this.idGroup, 'allAssignments', this.idGroup]);
      }
    }, 1000)

  }


  showUsers(id: number) {
    this.idGroup = id;
    this.activeTab = 'student'
    this.router.navigate(['groups', this.idGroup]);
  }
}
