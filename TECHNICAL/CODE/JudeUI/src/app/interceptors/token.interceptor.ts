import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // public currentUser: any;
  // public currentUserID: any; 
  
  // private token: string | null = null;

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (localStorage.getItem('Token')) {
    //   this.currentUser = localStorage.getItem('Token');
    //   this.token = this.currentUser.Token; 
    //   console.log("token",  this.token);
      
    // }


    //her we aslo check if use login or not then pass header
    //   if (isLoggedIn && isApiUrl) {
    //     request = request.clone({
    //         setHeaders: { Authorization: `Bearer ${account.token}` }
    //     });
    // }
    request = request.clone({
      setHeaders: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('Token')}`,
        // Authorization: `Bearer ${this.token}`,

      }
    });
    return next.handle(request);


    
  }


}
