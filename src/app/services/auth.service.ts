import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserModel } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = "";
  user: UserModel = new UserModel();

  constructor(
    private router: Router
  ) { }

  isAuthenticated(){
    this.token = localStorage.getItem("token") ?? "";
    if(this.token === ""){
      this.router.navigateByUrl("/login");
      return false;
    }

    const decode: JwtPayload | any = jwtDecode(this.token);
    const exp = decode.exp;
    const now = new Date().getTime() / 1000;

    if(now > exp){
      this.router.navigateByUrl("/login");
      return false;
    }
    let http = inject(HttpService);
    http.post<UserModel>("auth/GetCustomer").subscribe(res=>{
      this.user.id = res.id,
      this.user.email = res.email,
      this.user.firstName = res.firstName,
      this.user.lastName = res.lastName,
      this.user.departmentId = res.departmentId,
      this.user.isEmailVerified = res.isEmailVerified

      if(this.user.isEmailVerified === false){
        this.router.navigateByUrl("/verificationcode");
      }
    })

    return true;
  }
}