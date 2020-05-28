import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../../../core/services";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  title: any;

  constructor(private groupsService: GroupsService,
              public location: Location) { }

  ngOnInit(): void {
  }

  changeTitle() {

  }
}
