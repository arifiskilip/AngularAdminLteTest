import { Component } from '@angular/core';

@Component({
  selector: 'app-login-verification-code',
  standalone: true,
  imports: [],
  templateUrl: './login-verification-code.component.html',
  styleUrl: './login-verification-code.component.css'
})
export class LoginVerificationCodeComponent {

  isSendingVerificationCode: boolean = false;

  sendVerificationCode() {
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
  }
 }

