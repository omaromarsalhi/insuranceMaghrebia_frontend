import { Role } from "./role"

export interface EmployeeRegistrationRequest {
  firstname:string;
  lastname:string;
  email:string;
  roles?:Array<Role>;
}
