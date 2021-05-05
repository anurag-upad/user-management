import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UsersComponent } from './components/users/users.component';
import { AuthComponent } from './components/auth/auth.component';

//routes are searched by Angular router in the order they are declared
//therefore, wildcard route should be at the end
const appRoutes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard], children : [
    //{ path: ':id', component: UsersAddressComponent },
      //{ path: ':id/edit', component: UsersContactInfoComponent }
    ]},
   // { path: '', redirectTo: '/users', pathMatch:'full'} //default matching strategy is prefix
    { path: 'something', redirectTo : '**' },
    { path: 'auth', component: AuthComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', component: PageNotFoundComponent },
  ];


// NgModule is a directive used to convert a normal typescript class
// into Angular module
@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
      { enableTracing: false })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }