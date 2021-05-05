import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/app.constants';


//Customizing every HTTP request
//Nobody wants to repeat the same headers or config info on every HTTP request
export class AuthInterceptorService implements HttpInterceptor {

    isRequestAuthorized : boolean = AppConstants.requestAuthorization;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Appending authorization headers in request...');
        console.log('authorization :' + String(this.isRequestAuthorized));
        
        //we clone the request as it is immutable
        //and then we append a custom header to its existing headers
        const updatedReq = req.clone({
            //appending custom headers in your request
            headers : req.headers.append('authorization', String(this.isRequestAuthorized))
        });

        //forwarding the updated request; to continue on its journey
        return next.handle(updatedReq);
    }

}