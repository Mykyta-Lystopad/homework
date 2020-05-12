import { User } from '../../../../core/models';
import { Component, OnInit, Input } from '@angular/core';
import { Problem } from '../../../../core/models/problem.model';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  @Input() problem: Problem;
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {

  }

  onSolve(){
    alert('Solve problem')
  }

}
