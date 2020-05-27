import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class MyGroupsComponent implements OnInit, OnDestroy {

  groups$: Observable<Group[]>
  countGroup$: Observable<any>
  activeTab = 'student';
  idGroup: number;
  role: string;
  storage: any = window.localStorage;
  colorArray = ['bg-c-blue', 'bg-c-green', 'bg-c-yellow', 'bg-c-pink']
  private targetId = 0


  constructor(
    private router: Router,
    private roleService: RoleService,
    public groupService: GroupsService
  ) {
  }

  ngOnInit(): void {
    this.role = this.storage.getItem(environment.KEY_ROLE)
    this.groups$ = this.groupService.group
    this.groupService.load(this.role)
    this.countGroup$ = this.groupService.idGroup
    this.countGroup$.subscribe(response => {

      this.idGroup = response
      if (this.idGroup) {
        this.role === 'teacher' ? this.router.navigate(['groups', this.idGroup]) :
          this.router.navigate(['groups', this.idGroup, 'allAssignments', this.idGroup]);
      }
    })

  }

  showUsers(id: number) {
    this.idGroup = id;
    this.activeTab = 'student'
    this.router.navigate(['groups', this.idGroup]);
  }

  ngOnDestroy(): void {

  }


  getColor(idx: number) {
    this.targetId++
    if (this.targetId > 3) {
      this.targetId = 0
    }
    console.log(this.targetId)
    return this.colorArray[this.targetId]
  }
}
