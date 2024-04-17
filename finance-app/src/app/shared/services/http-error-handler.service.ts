import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private _router: Router) {}

  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Se a resposta for 401 Unauthorized, r
      this._router.navigate(['/login']);
    } else if (error.status === 404) {
      console.error('Recurso não encontrado. Status: 404');
    } else if (error.status === 500) {
      // Trate o erro 500 (Internal Server Error).
      console.error('Erro interno do servidor. Status: 500');
    } else {
      console.error('Erro não tratado. Status:', error.status);
    }
    return throwError(error);
  }
}