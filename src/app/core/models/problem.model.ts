import { Solution } from './solution.model';
export interface Problem {
    id?: number;
    title: string;
    description?: string;
    solutions?: Solution[];
}