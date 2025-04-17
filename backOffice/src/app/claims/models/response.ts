import { User } from "../../core/models/user/user";

export class Response{
  id!: string;
  user!: User;
  response!: string;
  respondedAt!: Date;
}