import { Problem } from './../../../../core/models/problem.model';
import { User } from '../../../../core/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
 
  @Input() problem: Problem;
  @Input() user: User;
  @Input() studentId: number;
  @Output() emitDel: EventEmitter<{}> = new EventEmitter();
  @Output() emitEdit: EventEmitter<Problem> = new EventEmitter(); 
  
  editProblemFlag = false;
  editedProblem: Problem = {
 
    title : '',
    description : ''
  }
  constructor() { }

  ngOnInit(): void {

  }

  onSolve(){
    alert('Solve problem')
  }

  onEdit(){
    this.editedProblem.id = this.problem.id;
    this.emitEdit.emit(this.editedProblem)    
    this.editProblemChange();
  }

  onDelete(){
    if (confirm(`You really want to delete ${this.problem.title} problem?`)){
      this.emitDel.emit(this.problem.id)
    }
  }

  editProblemChange(){
    if (this.user.role == 'teacher' && this.studentId == undefined){
      this.editProblemFlag = !this.editProblemFlag
      this.editedProblem.title = this.problem.title
      this.editedProblem.description = this.problem.description
    }    
  }
}
