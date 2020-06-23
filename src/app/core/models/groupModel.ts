import { User } from './user.model';
import { Group } from './group.model';

export class GroupModel implements Group{
  id?: number;
  model_code?: string;
  qr_code_link?: string;
  subject: string;
  title: string;
  note: string;
  show:boolean;
  users?: User[]
  constructor(){
    this.id = null;
    this.model_code = "";
    this.qr_code_link = "";
    this.subject = "";
    this.title = "";
    this.note = "";
    this.show = false;
    this.users = null
  }
}
