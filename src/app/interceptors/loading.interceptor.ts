import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import {LoadingService} from "../services/loading.service";
import { of } from 'rxjs';
import {GameInterceptor} from "./game.interceptor";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
export const loadingInterceptor = [ {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}];
