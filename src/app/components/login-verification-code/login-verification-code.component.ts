import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SharedModule } from '../../modules/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-verification-code',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login-verification-code.component.html',
  styleUrl: './login-verification-code.component.css'
})
export class LoginVerificationCodeComponent {

  /**
   *
   */
  constructor(private http:HttpService, private router:Router) {
    
  }

  isSendingVerificationCode: boolean = false;
  code:string="";
  sendVerificationCode() {

    this.http.post("Auth/VerificationCodeSend",{}).subscribe(res=>{
      this.isSendingVerificationCode = true;
    let count = 60;
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    if (sendCodeBtn) {
      const interval = setInterval(() => {
        count--;
        if (count === 0) {
          clearInterval(interval);
          this.isSendingVerificationCode = false;
          sendCodeBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Doğrulama kodu gönder';
          return;
        }
        sendCodeBtn.innerHTML = count + " saniye içinde yeniden gönder";
      }, 1000);
    }
    }) 
  }

  emailVerified(){
    this.http.post("Auth/EmailVerified",{code:this.code}).subscribe(res=>{
      
    })
  }
 }

