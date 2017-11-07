import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminAuthGuardService {

  constructor(auth: AuthService) {
    //super(auth);
   }

   canActivate(){
    // var isAuthenticated = super.canActivate();
     
     //return isAuthenticated? this.auth.isInRole('Admin') : false;
   }

}
