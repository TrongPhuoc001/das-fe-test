export interface Customer {
  [index: string]: string | number | Date;
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  email: string;
}
