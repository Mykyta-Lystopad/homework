import { UserSolution } from './solution.model';
export interface Problem {
    assignment_id?: number;
    id?: number;
    title: string;
    userSolution?: UserSolution;
}