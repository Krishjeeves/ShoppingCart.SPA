import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements  HttpInterceptor{

  private totalRequests = 0;

  isRequestInProgress(): boolean
  {
    return this.totalRequests > 0;
  }

  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    setTimeout(()=> {
      this.totalRequests++;
     }, 0);
    return next.handle(request)
    .pipe(
        finalize(() => {
          setTimeout(()=> {
            this.totalRequests--;
           }, 0);
                  }),
        catchError((error: HttpErrorResponse) => {
            //Do something with error like showing a toaster
            return throwError(error?.message);
        })
    );
  }
}
