import { AxiosResponse } from 'axios';
import { LoginForm, RegisterForm } from 'src/type';
import { InstanceAxios } from './Axios';
import { Cookies } from 'quasar';
import { isNull } from 'lodash';

export class Auth {
  static async login({ email, password }: LoginForm): Promise<AxiosResponse> {
    const data = { email, password };
    return await InstanceAxios.post('/user/signin', data);
  }
  static isAuthenticated(): boolean {
    const token = Cookies.get('token');
    return !!token;
  }

  static async register({
    firstName,
    lastName,
    email,
    password,
  }: RegisterForm): Promise<AxiosResponse> {
    const info = { firstName, lastName, email, password };
    if (isNull(info)) {
      throw 'Information incomplet';
    }
    return await InstanceAxios.post('user/signup', info);
  }
}
