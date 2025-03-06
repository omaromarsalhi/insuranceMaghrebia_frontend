import { User } from "./user";

export class Response{
  id!: string;
  user!: User;
  response!: string;
  respondedAt!: Date;
}