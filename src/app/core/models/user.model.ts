export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  model_code?: string;
  qr_code_link?: string;
  api_token?: string;
}
