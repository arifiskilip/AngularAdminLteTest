import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { LoginModel } from '../../models/login.model';
import { HttpService } from '../../services/http.service';
import { LoginResponseModel } from '../../models/login.response.model';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginModel = new LoginModel();
 
  constructor(
    private http: HttpService,
    private router: Router,
    private swal:SwalService
  ){}

  signIn(){
    this.http.post<LoginResponseModel>("Auth/Login",this.model).subscribe(res=>{
      localStorage.setItem("token", res.accessToken.token);
      localStorage.setItem("refreshToken", res.refreshToken.token);
      this.swal.callToast("Giriş işlemi başarılı!");
      this.router.navigateByUrl("/");
    })
  }
}
