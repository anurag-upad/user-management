import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoggingInterceptorService implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Outgoing request...');
        console.log(req.url);

        return next.handle(req)
            .pipe(catchError((errorHandle: any) => {
                console.log('Error occured in ' + req.method + ' request!');
                console.log('Request URL being : ' + req.url)
                if (errorHandle instanceof HttpErrorResponse) {
                    if (errorHandle.status === 400) {
                        console.log('400 Bad Request. Check the input data.');
                        this.router.navigate(['/unauthorized']);
                    } else if (errorHandle.status === 401) {
                        console.log('401 Unauthorized error');
                        this.router.navigate(['/unauthorized']);
                    } else if (errorHandle.status) {
                        console.log('HTTP ' + req.method + ' Error');
                    }
                    return throwError(req.method + ' Operation FAILED!!');
                }
            })
            );
    }

}