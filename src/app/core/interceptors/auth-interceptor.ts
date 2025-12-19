import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();

  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq).pipe(
    catchError((err) => {
      if (err?.status === 401 || err?.status === 403) {

        alert(
          'NO TIENES PERMISOS PARA REALIZAR ESTA ACCIÓN.\n\n' +
          'La sesión se cerrará en breves.'
        );

        setTimeout(() => {
          auth.logout();
          router.navigateByUrl('/login').then(() => {
            window.location.reload();
          });
        }, 3000);

        return EMPTY;
      }

      return EMPTY;
    })
  );
};