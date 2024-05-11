import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SwalService } from '../services/swal.service';
import { RefreshToken } from '../models/refreshToken';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(SwalService);
  const spinner = inject(NgxSpinnerService);
  const authService=inject(AuthService)
  const router = inject(Router);

  return next(req).pipe(catchError(error => {
    spinner.show();
    switch (error.status) {
      case HttpStatusCode.Unauthorized:
        authService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
          if (!state) {
            toastr.callToast("Bu işlemi yapmaya yetkiniz bulunmamaktadır!");
          }
          else{
            console.log(state)
          }
        }).then(data => {
          toastr.callToast("Bu işlemi yapmaya yetkiniz bulunmamaktadır!");
        });
        toastr.callToast("Yetkiniz yok!");
        break;
      case HttpStatusCode.InternalServerError:
        toastr.callToast("Sunucuya erişilmiyor!", "error");
        break;
      case HttpStatusCode.BadRequest:
         toastr.callToast(error.error.message, "error");
        break;
      case HttpStatusCode.NotFound:
        toastr.callToast("Sayfa bulunamadı!", "error");
        break;
      default:
        toastr.callToast("Beklenmeyen bir hata meydana gelmiştir!", "error");
        break;
    }

    spinner.hide();
    return of(error);
  }));
};