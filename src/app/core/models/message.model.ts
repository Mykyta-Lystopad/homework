import { User } from './user.model';
export interface Message{
    id: number;
    message: string;
    user?:User;    
    created_at?: Date;
    updated_at?: Date;
    student_id?: number;
    assignment_id?: number; 
}