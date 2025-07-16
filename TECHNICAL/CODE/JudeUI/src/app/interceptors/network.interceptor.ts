import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../Loader/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  TotalRequest = 0;
  CompleteRequest = 0;
  constructor(private Loader: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has('Skip-Interceptor')) {
      const clonedRequest = request.clone({
        headers: request.headers.delete('Skip-Interceptor')
      });
      return next.handle(clonedRequest);
    }
    this.Loader.show();
    this.TotalRequest++;
    // 
    return next.handle(request).pipe(
      finalize(() => {
        this.CompleteRequest++;
        if (this.CompleteRequest === this.TotalRequest) {
          this.Loader.hide();
          // 
          // 
          this.CompleteRequest = 0;
          this.TotalRequest = 0;
        }

      })
    );
  }
}
