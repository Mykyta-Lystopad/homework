import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout-index',
  templateUrl: './layout-index.component.html',
  styleUrls: ['./layout-index.component.scss']
})
export class LayoutIndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
