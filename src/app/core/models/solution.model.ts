import { Attachment } from './attachment.model';
export interface Solution {
    id: number;
    comment?: string;
    teacher_mark?: number
    attachments?: Attachment[];
}