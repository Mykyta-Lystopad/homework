import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Group} from "../../../core/models/group.model";
import {GroupsService} from "../../../core/services";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  groups$: Observable<Group[]>
  role: string;

  constructor(
    private groupService: GroupsService) {
  }

  ngOnInit(): void {
    this.groups$ = this.groupService.group
  }

  delete(id: number) {
    this.groupService.remove(id)
  }

  edit(id: number) {

  }
}
