import { Solution } from './solution.model';
export interface Problem {
    assignment_id?: number;
    id?: number;
    title: string;
    description?: string;
    userSolution?: Solution;
}