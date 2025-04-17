import { Gender } from "./gender";
import { Role } from "./role";

export class User {
  id?: string; 
  firstname: string;
  lastname: string;
  email: string;
  password?: string; 
  dateOfBirth: Date;
  gender: Gender;
  phone: string;
  address: string;
  creationDate?: Date;
  lastModifiedDate?: Date; 
  lastLoginDate?: Date;
  accountLocked: boolean;
  enabled: boolean;
  roles: Role[]; 
  canContinue : boolean;
}

export function fullName(user: User): string {
  return `${user.firstname} ${user.lastname}`;
}