import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner:NgxSpinnerService = inject(NgxSpinnerService);
  // Sadece GET isteklerini hariç tut
  if (req.method !== 'GET') {
    spinner.show();
  }
  
  return next(req).pipe(
    finalize(() => {
      if (req.method !== 'GET') {
        spinner.hide();
      }
    })
  );
};
