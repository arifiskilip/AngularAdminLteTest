import { AccessToken } from "./accessToken";
import { RefreshToken } from "./refreshToken";

export class LoginResponseModel{
    id:number = 0;
    firstName:string = "";
    lastName:string = "";
    email:string = "";
    departmentId:number = 0;
    birthDay:Date = new Date();

    accessToken:AccessToken = new AccessToken();
    refreshToken:RefreshToken = new RefreshToken();
}