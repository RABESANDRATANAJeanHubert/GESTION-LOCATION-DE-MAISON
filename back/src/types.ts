export interface UserData {
  firstName: string;
  lastName: string;
  email: String;
  password: String;
  roleId: Number;
  active: Boolean;
  verified: Boolean;
}

export interface Appartementttributes {
  id?: string;
  appartement: string | undefined;
  loyer?: string | null;
  surface?: string | null;
  adresse_postale?: string | null;
}

export interface ClientAttributes {
  id?: string;
  name: String;
  lastName?: string | null;
  phone: number | undefined;
  email: string | undefined;
  address: string | null;
}

export interface UserRentAttributes {
  id?: string;
  firstName: string;
  lastName: String;
  email: String;
  phone: String;
  adress: string;
  appartment_id?: BigInt;
  active?: boolean;
}

export interface UserAttributes {
  id?: number;
  firstName?: String | null;
  lastName?: String | null;
  email?: String | null;
  roleId?: Number | null;
  password?: String;
  verified?: Boolean;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
