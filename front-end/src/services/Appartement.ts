import { AxiosResponse } from 'axios';
import { CreateAppartement, EntityAppartement, UpdateTaskDto } from 'src/type';
import { InstanceAxios } from './Axios';

export class Appartment {
  static async create(data: CreateAppartement): Promise<EntityAppartement> {
    const response: AxiosResponse<any, EntityAppartement> =
      await InstanceAxios.post('/appartment/add', data);
    return response.data;
  }

  static async getAll(): Promise<EntityAppartement[]> {
    const response: AxiosResponse<any, EntityAppartement[]> =
      await InstanceAxios.get('/appartment');
    return response.data;
  }

  static async remove(id: string): Promise<boolean> {
    const response: AxiosResponse = await InstanceAxios.delete(
      `appartment/${id}`,
      {}
    );
    return response.data;
  }
  static async getDetailAppartement(id: string): Promise<boolean> {
    const response: AxiosResponse = await InstanceAxios.get(
      `appartment/${id}`,
      {}
    );
    return response.data;
  }
  static async update(data: UpdateTaskDto): Promise<EntityAppartement> {
    const { id, ...dataInput } = data;
    const response: AxiosResponse<any, EntityAppartement> =
      await InstanceAxios.put(`/appartment/${id}`, dataInput);
    return response.data;
  }
}
