import { serverTimestamp } from "firebase/database";

export type UserRoles = 'admin' | 'customer';

export type AddressType = {
  id: string;
  firstname: string;
  lastname: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
};

export type UserType = {
  birthdate: string;
  createdAt: ReturnType<typeof serverTimestamp>;
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRoles;
  defaultShippingAddress: string;
  defaultBillingAddress: string;
  addresses: {
    [key: string]: AddressType;
  };
};