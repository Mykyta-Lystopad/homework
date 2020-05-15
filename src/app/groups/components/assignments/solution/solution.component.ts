import { Solution } from '../../../../core/models/solution.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {
  @Input() solution: Solution;// тут только один элемент в массиве.....
  constructor() { }

  ngOnInit(): void {

  }

}
