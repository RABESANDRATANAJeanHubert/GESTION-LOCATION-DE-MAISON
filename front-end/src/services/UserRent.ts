import { AxiosResponse } from 'axios';
import { UpdateUserRentForm, UserRentCreate, UserRentEntity } from 'src/type';
import { InstanceAxios } from './Axios';

export class UserRent {
  static async getAll(): Promise<UserRentEntity[]> {
    const response: AxiosResponse<any, UserRentEntity[]> =
      await InstanceAxios.get('/user-rent');
    return response.data;
  }
  static async create(data: UserRentCreate): Promise<UserRentEntity> {
    const response: AxiosResponse<any, UserRentEntity> =
      await InstanceAxios.post('/user-rent/add', data);
    return response.data;
  }
  static async update(data: UpdateUserRentForm): Promise<UserRentEntity> {
    const { id, ...dataInput } = data;
    const response: AxiosResponse<any, UserRentEntity> =
      await InstanceAxios.put(`/user-rent/${id}`, dataInput);
    return response.data;
  }

  static async remove(id: string): Promise<boolean> {
    const response: AxiosResponse = await InstanceAxios.delete(
      `user-rent/${id}`,
      {}
    );
    return response.data;
  }
  static async getDetailUserRent(id: string): Promise<boolean> {
    const response: AxiosResponse = await InstanceAxios.get(
      `user-rent/${id}`,
      {}
    );
    return response.data;
  }
}
