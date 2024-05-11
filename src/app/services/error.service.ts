import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private swal: SwalService
  ) { }

  errorHandler(err:HttpErrorResponse){
    let textMessage:string = "";
    if(err.error.Errors){
      err.error.Errors.forEach((x:any) => {
          x.Errors.forEach((y:any) => {
            textMessage+=y+'\n';
            this.swal.callToast(y,"error");
          });
        });
      }
      else{
        this.swal.callToast(err.error.detail,"error")
      }
      textMessage.length>0 ? this.swal.callToast(textMessage,"error") : "";

  }
}
