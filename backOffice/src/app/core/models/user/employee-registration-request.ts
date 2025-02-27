import { Role } from "./role"

export class EmployeeRegistrationRequest {
  firstname:string;
  lastname:string;
  email:string;
  roles:Array<Role>;
}
