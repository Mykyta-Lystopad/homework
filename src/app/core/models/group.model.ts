import { User } from './user.model';
export class Group {
  id?: number;
  model_code?: string;
  qr_code_link?: string;
  subject: string;
  title: string;
  show:boolean;
  users?: User[]
}
