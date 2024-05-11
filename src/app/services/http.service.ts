import { api } from './../constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, tap, catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService,
    private spinner: NgxSpinnerService
  ) { }

  post<T>(url: string, model?: any): Observable<T> {
    this.spinner.show();
    return this.http.post<T>(`${api}/${url}`, model).pipe(
      tap(_ => this.spinner.hide()),
      catchError(
        err => this.handleError(err))
    );
  }

  private handleError(err: any): Observable<never> {
    this.spinner.hide();
    this.error.errorHandler(err);
    return EMPTY;
  }
}
