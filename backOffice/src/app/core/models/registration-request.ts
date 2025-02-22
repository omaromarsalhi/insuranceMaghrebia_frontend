import { Gender } from "./gender";

export class RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: Gender;
  phone: string;
  address: string;
  password: string;
}
