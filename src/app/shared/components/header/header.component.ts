import {Component, OnDestroy, OnInit} from '@angular/core';
import {NamesService, UserService} from '../../../core/services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  constructor(
    public nameServise: NamesService
  ) {
  }

  ngOnInit() {

  }





}
