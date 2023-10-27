import { UserSolution } from './solution.model';
export class ProblemModel {
    assignment_id?: number;
    id?: number;
    title: string;
    userSolution?: UserSolution;
    constructor(AssignId: number){
        this.assignment_id = AssignId;
        this.id = null;
        this.title = '';
        this.userSolution = null;   
    }
}