import {Component, OnInit} from '@angular/core';
import {GroupsService} from "../../../core/services";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  title = '';
  idGroup: number

  constructor(private groupsService: GroupsService,
              private activeRoute: ActivatedRoute,
              public location: Location) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(idGroup => this.idGroup = idGroup.id)
    this.activeRoute.queryParams.subscribe((queryParam: any) => {
      this.title = queryParam['title']
    })
  }

  changeTitle() {
    this.groupsService.changeGroup(this.idGroup, this.title)
    this.location.back()
  }
}
