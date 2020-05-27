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
  activeAccordion: boolean;
  title = ''

  constructor(
    private groupService: GroupsService) {
  }

  ngOnInit(): void {
    this.groups$ = this.groupService.group
    this.activeAccordion = false
    console.log("Create")
  }

  delete(id: number) {
    this.groupService.remove(id)
  }

  addGroup() {
    this.groupService.add(this.title, 1)
    this.title = ''
    this.activeAccordion = false
  }
}
