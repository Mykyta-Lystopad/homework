export class UserModel {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  role_comment?: string;
  role?: string;
  model_code?: string;
  qr_code_link?: string;
  api_token?: string;
  constructor(){
    this.id = null;
    this.first_name = "";
    this.last_name = "";
    this.email = "";
    this.password = "";
    this.role_comment = "";
    this.role = "";
    this.model_code = "";
    this.qr_code_link = "";
    this.api_token = "";
  }
}
