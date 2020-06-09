import {Component, OnInit} from '@angular/core';
import {GroupsService} from "../../../core/services";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Group} from "../../../core/models/group.model";

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  title = '';
  idGroup: number
  group: Group

  constructor(private groupService: GroupsService,
              private activeRoute: ActivatedRoute,
              public location: Location) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(idGroup => this.idGroup = idGroup.id)
    this.activeRoute.queryParams.subscribe((queryParam: any) => {
      this.title = queryParam['title']
    })
    this.group = this.groupService.getGroup(this.idGroup)
  }

  changeTitle() {
    this.groupService.changeGroup(this.idGroup, this.title)
    this.location.back()
  }

  delete() {
    this.groupService.remove(this.idGroup)
    this.location.back()
  }
}
