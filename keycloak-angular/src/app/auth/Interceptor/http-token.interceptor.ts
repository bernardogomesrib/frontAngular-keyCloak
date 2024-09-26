import { HttpInterceptorFn } from '@angular/common/http';



export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const tkn = localStorage.getItem('token') || undefined;
  if (tkn) {
    req.headers.set('Authorization', `Bearer ${tkn}`);
    //req.headers.set('refresh_token', localStorage.getItem('refresh_token') || '');
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tkn}`
      }
    });
    return next(newReq);
  }
  else {
    return next(req);
  }
}
