import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '../constants/app.constants';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    domainName = AppConstants.domainName;

    constructor(private http: HttpClient,
        private router: Router) { }

    getAllUsers() {
        // Send Http GET request
        // Htttp requests are sent only when you subscribe to it
        // i.e. only when someone is interested in the response
        return this.http.get<User[]>(this.domainName + '/employees')
            .pipe(catchError(this.handleError));
    }

    saveUser(user: User) {
        // Send Http POST request
        return this.http.post<User>(this.domainName + '/employee', user);
    }

    removeUser(userId: number) {
        // Send Http DELETE request
        return this.http.delete(
            this.domainName + '/removeUser/' + userId)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        // this error logging code can be outsourced to LoggingInterceptorService
        if (error instanceof HttpErrorResponse) {
            if (error.status === 400) {
                console.log('400 Bad Request. Check the input data.');
                this.router.navigate(['/unauthorized']);
            } else if (error.status === 401) {
                console.log('401 Unauthorized error');
                this.router.navigate(['/unauthorized']);
            } else if (error.status) {
                console.log('HTTP ' + error.status + ' Error');
            }
            return throwError('Something FAILED!!');
        }
    }

}