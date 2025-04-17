import { Gender } from "./gender";

export class UpdateProfileRequest {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    gender: Gender;
    phone: string;
    address: string;
}
