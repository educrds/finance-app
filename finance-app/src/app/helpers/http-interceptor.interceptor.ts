import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { HttpErrorHandlerService } from '../shared/services/http-error-handler.service';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {
    #_storageService = inject(StorageService);
    #_router = inject(Router);
    #_httpErrorHandlerService = inject(HttpErrorHandlerService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authRoutes = req.url.includes('/login') || req.url.includes('/register');

    if (authRoutes) {
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => this.#_httpErrorHandlerService.handleHttpError(err))
      );
    }

    // Verifica usuario logado e segue com a requisiçao enviando payload modificado
    // com headers e id do usuário no body.
    if (this.#_storageService.isLoggedIn()) {
      const token = this.#_storageService.getToken;

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next
        .handle(req)
        .pipe(retry(1), catchError((error: HttpErrorResponse) => this.#_httpErrorHandlerService.handleHttpError(error)));
    }

    this.#_router.navigate(['/auth/login']);
    return throwError(() => new Error('Usuário não autenticado'));
  }
}

export const httpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiRequestInterceptor,
  multi: true,
};
