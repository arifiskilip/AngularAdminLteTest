import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserModel } from '../models/user.model';
import { HttpService } from './http.service';
import { firstValueFrom } from 'rxjs';
import { RefreshTokenResponse } from '../models/refreshTokenResponse';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token: string = "";
  user: UserModel = new UserModel();
  constructor(
    private router: Router
  ) { }
  
  isAuthenticated() {
    const token: string | null = localStorage.getItem("token");
  
    if (!token) {
      this.router.navigateByUrl("/login");
      return false;
    }
  
    const expired: boolean = this.isTokenExpired(token);
  
    if (expired) {
      this.router.navigateByUrl("/login");
      return false;
    }
  
    this.getUserDetails();
    
    return true;
  }
  
  private isTokenExpired(token: string): boolean {
    const jwtHelper = inject(JwtHelperService);
    return jwtHelper.isTokenExpired(token);
  }
  
  private getUserDetails() {
    const http = inject(HttpService);
    http.post<UserModel>("auth/GetCustomer").subscribe(
      (res) => {
        this.user.isEmailVerified = res.isEmailVerified;
        if (!this.user.isEmailVerified) {
          this.router.navigateByUrl("/verificationcode");
        }
      },
      (error) => {
        console.error("Error fetching user details:", error);
        // Handle error as necessary
      }
    );
  }

  refreshTokenLogin(refreshToken: string | null){
    let http = inject(HttpService);
    http.post<RefreshTokenResponse>("Auth/RefreshTokenCheck", { refreshToken: refreshToken })
    .subscribe(res=>{
      localStorage.setItem("accessToken", res.accessToken.token);
      localStorage.setItem("refreshToken", res.refreshToken.token);
    },err=>console.log("Hata var koç"));
   }
}

