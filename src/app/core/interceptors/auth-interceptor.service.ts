import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

//Por si se necesita Tocken de autenticación en el futuro
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('fantasy_token');

    // Si hay un token y la solicitud es para la API de fantasy
    if (token && request.url.includes('api-fantasy.llt-services.com')) {
      // Clonar la solicitud y añadir el token
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }

    // Si no hay token o la solicitud no es para la API de fantasy
    return next.handle(request);
  }
}
