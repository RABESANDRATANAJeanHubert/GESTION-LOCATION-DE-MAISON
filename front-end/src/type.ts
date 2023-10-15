type SystemMessageType = 'error' | 'info';
interface SystemMessage {
  type: SystemMessageType;
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface EntityAppartement {
  info: EntityAppartement[];
  id: number;
  appartement: string;
  loyer: number;
  surface: string;
  adresse_postale: string;
  updatedAt: string;
}
export interface CreateAppartement {
  appartement: string;
  loyer: string;
  surface: string;
  adresse_postale: string;
}
export interface UpdateTaskDto {
  id: string;
  appartement: string;
  loyer: string;
  surface: string;
  adresse_postale: string;
}
export interface AppartmentForm {
  appartement: string;
  loyer: string;
  surface: string;
  adresse_postale: string;
}

export interface UserRentEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adress: string;
  appartement_id: string;
  appart: {
    appartement: string;
    loyer: string;
    surface: string;
    adresse_postale: string;
  };

  updatedAt: string;
}

export interface UserRentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appartment_id: string;
  adress: string;
}

export interface UserRentCreate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appartment_id: string;
  adress: string;
}

export interface UpdateUserRentForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appartment_id: string;
  adress: string;
}
