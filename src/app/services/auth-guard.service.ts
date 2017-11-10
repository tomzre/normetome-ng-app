import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {




  constructor(protected auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.isAuthenticated()){
      if(this.auth.isInRole(route.data.requiredRoles)){
       return true;
      }
      this.router.navigateByUrl('');
      return false;
    }

      this.auth.login();
      return false;
  }

}
